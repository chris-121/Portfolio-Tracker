const helpers = require('../helpers/userHelpers');

module.exports.FundTransaction = async (req, res) => {
    let Amount = parseInt(req.body.Amount)
    if (req.body.Operation == 'Withdraw')
        Amount *= -1
    console.log(Amount);
    await helpers.addFundTransfer(Amount)
    res.json(true)
}
module.exports.getAllDetails = async (req, res) => {
    let obj = await helpers.getAllDetails();
    res.json(obj)
}
module.exports.setTarget = async (req, res) => {
    let { Amount, SIP, Years } = req.body;
    await helpers.setTarget(Amount, SIP, Years);
    res.json(true)
}
module.exports.buyAndSellScrip = async (req, res) => {
    let obj = {};
    obj.ScriptName = req.body.ScripName;
    if (req.body.Operation == "SELL")
        req.body.Qty = -req.body.Qty;
    obj.Qty = parseInt(req.body.Qty);
    obj.avgPrice = parseInt(req.body.AvgPrice);
    obj.Category = req.body.Category;
    await helpers.buyAndSellScrip(obj);
    res.json(true)
}
module.exports.autoUpdate = async (req, res) => {
    await helpers.autoUpdate()
}
module.exports.updatePrice = async (req, res) => {
    console.log(req.body);
    await helpers.Update(req.body).catch((e)=> console.log(e))
}
module.exports.DashBoardData = async (req, res) => {
    console.log(req.body);
    await helpers.dashBoardData(req.body.year,req.body.timeSeries).catch((e)=> console.log(e))
}