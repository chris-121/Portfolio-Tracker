const User = require('../models/User');
const FundTransaction = require('../models/fundtransaction');
const Transaction = require('../models/transaction');
const sequelize = require('../database/connection');
const { Op } = require('sequelize');
const Portfolio = require('../models/portfolio');
const PortfolioValue = require('../models/portfoliovalue');
const CapitalDetail = require('../models/capitaldetail')
const axios = require('axios');

module.exports.addFundTransfer = async (Amount) => {
    let currentTime = new Date();
    let Year = currentTime.getFullYear();
    const existence = await FundTransaction.findOne({ where: { user_id: 1 } });
    if (!existence) {
        const addCapitalDetails = await CapitalDetail.create({
            Capital: Amount,
            Starting_Capital: Amount,
            user_id: 1,
            Year,
        })
        await addCapitalDetails.save();
    } else {
        const addCapitalDetails = await CapitalDetail.findOne({ where: { user_id: 1, Year } })
        addCapitalDetails.Capital += Amount;
        await addCapitalDetails.save();
    }
    const fundtransaction = await FundTransaction.create({
        user_id: 1,
        Amount,
    })
    await fundtransaction.save();
}
module.exports.dashBoardData = async (year,timeSeries) => {
    
}

module.exports.getAllDetails = async () => {
    let obj = await getAllDetail();
    return obj;
}
module.exports.setTarget = async (Amount, SIP, Years) => {
    const user = await User.findOne({ where: { id: 1 } })
    user.Target_Amount = parseInt(Amount);
    user.Monthly_SIP = parseInt(SIP);
    user.Years = parseInt(Years);
    await user.save();
    return;
}
module.exports.Update = async (arr) => {
    for (let i = 0; i < arr.length; i++) {
        const portfolio = await Portfolio.findOne({ where: { ScriptName: arr[i].name } })
        portfolio.Current_Price = arr[i].price;
        portfolio.save();
    }
}
module.exports.buyAndSellScrip = async (obj) => {
    let { ScriptName, Qty, avgPrice, Category } = obj;
    const existInPortfolio = await Portfolio.findOne({ raw: true, where: { user_id: 1, ScriptName } })
    if (!existInPortfolio) {
        const portfolio = await Portfolio.create({
            user_id: 1,
            ScriptName,
            Category,
        })
        let { data } = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ScriptName.toUpperCase()}.BSE&outputsize=compact&apikey=1YDOH26EDCQEQHCP`)
        if (data)
            for (i in data["Time Series (Daily)"]) {
                let close = parseFloat(data["Time Series (Daily)"][i]["4. close"]);
                portfolio.Current_Price = close;
                break;
            }
        await portfolio.save();
    }
    if (Qty < 0) {
        let addedLevels = await getAddedLevels(ScriptName);
        gainLoss = 0; tempQty = (-1 * Qty), j = 0;
        while (tempQty) {
            if (addedLevels[j].Qty >= tempQty) {
                gainLoss += (avgPrice - addedLevels[j].avgPrice) * tempQty;
                break;
            } else {
                gainLoss += (avgPrice - addedLevels[j].avgPrice) * (tempQty - addedLevels[j].Qty);
                tempQty -= addedLevels[j].Qty;
            }
            j++;
        }
        let currentTime = new Date();
        let Year = currentTime.getFullYear();
        const capitalDetail = await CapitalDetail.findOne({ where: { user_id: 1, Year } })
        capitalDetail.Capital += gainLoss;
        await capitalDetail.save();
        const script = await Transaction.findAll({
            attributes: ["ScriptName", [sequelize.fn("SUM", sequelize.col('Qty')), 'Qty']],
            raw: true, where: { ScriptName }
        });
        if (script[0].Qty + Qty == 0) {
            await Portfolio.destroy({ where: { user_id: 1, ScriptName } })
        }
    }
    const transaction = await Transaction.create({
        user_id: 1,
        ScriptName,
        Qty,
        avgPrice,
        Category
    })
    await transaction.save();
    return;
}
module.exports.autoUpdate = async () => {
    const d = new Date();
    const list = await Portfolio.findAll({ raw: true });
    let i = 0
    for (i; i < list.length; i++) {
       // await sleep(15000);
        let { data } = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${list[i].ScriptName.toUpperCase()}.BSE&outputsize=compact&apikey=1YDOH26EDCQEQHCP`)
        const portfolio = await Portfolio.findOne({ where: { ScriptName: list[i].ScriptName } });
        if (data) {
            for (let j in data["Time Series (Daily)"]) {
                let close = parseFloat(data["Time Series (Daily)"][j]["4. close"]);
                portfolio.Current_Price = close;
                await portfolio.save();
                break;
            }
        }
    }
    let Data = await getAllDetail();
    CurrentValue = Data[0].Capital
    Data.forEach((element, index) => {
        if (index !== 0) {
            CurrentValue += (element.Current_Price * element.Qty) - (element.avgPrice * element.Qty)
        }
    });
    let TimeSeries = 'Daily'
    if (d.getDate() == 28)
        TimeSeries = 'Monthly'
    else if (d.getDay() == 5)
        TimeSeries = 'Weekly'
    const portfolioValue = await PortfolioValue.create({
        user_id: 1,
        CurrentValue,
        TimeSeries
    })
    await portfolioValue.save();
}
async function getFunds() {
    const availablefund = await FundTransaction.findAll({
        attributes: ["user_id", [sequelize.fn("SUM", sequelize.col('Amount')), 'Amount']],
        raw: true, where: { user_id: 1 }
    });
    const totalAddedFunds = await FundTransaction.findAll({
        attributes: ["user_id", [sequelize.fn("SUM", sequelize.col('Amount')), 'Amount']],
        raw: true, where: { user_id: 1, Amount: { [Op.gt]: 0 } }
    });
    const totalWithdrawnfund = await FundTransaction.findAll({
        attributes: ["user_id", [sequelize.fn("SUM", sequelize.col('Amount')), 'Amount']],
        raw: true, where: { user_id: 1, Amount: { [Op.lt]: 0 } }
    });
    let array = [availablefund, totalAddedFunds, totalWithdrawnfund]
    return array;
}
async function getAddedLevels(ScriptName) {
    let addedLevels = await Transaction.findAll({ raw: true, where: { user_id: 1, ScriptName, Qty: { [Op.gt]: 0 } } })
    let soldLevels = await Transaction.findAll({ raw: true, where: { user_id: 1, ScriptName, Qty: { [Op.lt]: 0 } } })
    let j = 0;
    if (soldLevels.length)
        while (soldLevels[j].Qty < 0) {
            if (addedLevels[0].Qty >= (-1 * (soldLevels[j].Qty))) {
                addedLevels[0].Qty += soldLevels[j].Qty;
                j++;
                if (addedLevels[0].Qty == 0)
                    addedLevels.shift();
            } else {
                soldLevels[j].Qty += addedLevels[0].Qty;
                addedLevels.shift();
            }
            if (j == soldLevels.length)
                break;
        }
    return addedLevels;
}
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
async function getAllDetail() {
    try {
        let currentTime = new Date();
    let Year = currentTime.getFullYear();
    const Target = await User.findOne({ raw: true, where: { id: 1 } });
    const capDetail = await CapitalDetail.findOne({ raw: true, where: { user_id: 1, Year } })
    const fundtransaction = await FundTransaction.findAll({ raw: true, where: { user_id: 1 } })
    const transaction = await Transaction.findAll({ raw: true, where: { user_id: 1 } })
    let Capital = capDetail.Capital, Starting_Capital = capDetail.Starting_Capital;
    let fund = await getFunds();
    let availableFunds = fund[0][0].Amount, totalAddedFunds = fund[1][0].Amount, totalWithdrawnFunds = fund[2][0].Amount
    const scripts = await Transaction.findAll({
        attributes: ["ScriptName", [sequelize.fn("SUM", sequelize.col('Qty')), 'Qty']],
        raw: true, group: 'ScriptName'
    });
    let existingScripts = [];
    scripts.forEach((element, index) => {
        if (element.Qty != '0')
            existingScripts.push(element);
    });
    const weeklyChange = await PortfolioValue.findOne({ raw: true, limit: 1, where: { user_id: 1, TimeSeries: 'Weekly' }, order: [['id', 'DESC']] });
    const monthlyChange = await PortfolioValue.findOne({ raw: true, limit: 1, where: { user_id: 1, TimeSeries: 'Monthly' }, order: [['id', 'DESC']] })
    let lastWeekClose = 0, lastMonthClose = 0
    weeklyChange ? lastWeekClose = weeklyChange.CurrentValue : ""
    monthlyChange ? lastMonthClose = monthlyChange.CurrentValue : ""
    const portfolioValue = await PortfolioValue.findAll({raw:true, where: { user_id: 1 }})
    console.log(portfolioValue);
    let funds = {
        Target_Amount: Target.Target_Amount, SIP: Target.Monthly_SIP, Years: Target.Years,
        availableFunds, totalAddedFunds, totalWithdrawnFunds, Capital, Starting_Capital,
        lastWeekClose, lastMonthClose,portfolioValue,fundtransaction,transaction
    };
    let obj = [funds];
    for (let i = 0; i < existingScripts.length; i++) {
        let addedLevels = await getAddedLevels(existingScripts[i].ScriptName);
        console.log(addedLevels);
        let Qty = 0, Sum = 0, ScriptName = addedLevels[0].ScriptName;
        addedLevels.forEach((element) => {
            Sum += element.Qty * element.avgPrice;
            Qty += element.Qty
        })
        let avgPrice = Sum / Qty;
        const currentPrice = await Portfolio.findOne({ raw: true, where: { ScriptName } })
        console.log({ ScriptName, Qty, avgPrice, Current_Price: currentPrice.Current_Price });
        obj.push({ ScriptName, Qty, avgPrice, Current_Price: currentPrice.Current_Price,Category:currentPrice.Category })
    }

    console.log(obj);
    return obj;
    } catch (error) {
        console.log(error);
    }
    
}