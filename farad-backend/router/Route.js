const express = require("express")
const route = express.Router()
const controller = require("../controller/userController")



route.get('/get_chat/:requestId', controller.getChat)

route.get('/update-campaign/:campaignId/:requestId', controller.updateCampaign); // it has also set stream

route.get('/retrive_stream/:campaignId/:requestId', controller.retriveStream)

route.post('/verify_frame', controller.verifyFrame)

route.post('/start_stream', controller.startStream)

route.post('/end_stream', controller.endStream)

route.post('/chat', controller.chat)

route.post('/create_campaign', controller.createCampaign)

route.post('/send_request', controller.sendRequest)

route.post('/retrive_request', controller.retriveRequest)

route.get('/get_ongoingcampaigns', controller.getOngoingCampaigns)

route.get('/get_campaigns/:walletAddress', controller.getCampaigns)

route.get('/get_campaign_by_id/:id', controller.getCampaignById) // also return accepted request

route.post('/request', controller.createCampaign)

route.post('/store_indluencer', controller.storeInfluencer)

 
module.exports = route