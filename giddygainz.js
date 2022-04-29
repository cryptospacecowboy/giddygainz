// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: magic;
// ----------------------------------------------------------
// GiddyGainz - A Giddy Rewards Widget for iOS
// Space Cowboy's Tip Jar: 0x7E217ed7c2b03ec4bb163341875fd7cA5e4c726e
// TommyTippie's Tip Jar: 0x8b776F21aD7389Ce1c37913d696c2Eb778771c1F
// ----------------------------------------------------------

// Theme Options - 'light' or 'dark'
const theme = 'light'
const bgColor = (theme == 'light') ? Color.white() : Color.black()
const textColor = (theme == 'light') ? Color.black() : Color.white()
const logo = (theme == 'light') ? 'https://i.ibb.co/S5W7pQC/giddy-logo-horizontal.png' : 'https://i.ibb.co/2WLSW3M/giddy-logo-horizontal-white.png'
const locale = 'en-US'

// Get Unharvested Rewards
const wallet = 'YOUR_WALLET_ADDRESS'
const hurl = 'https://us-central1-fifth-liberty-317301.cloudfunctions.net/GetGiddyPending'
const hreq = new Request(hurl)
hreq.method = 'post'
hreq.body = JSON.stringify({ ADDRESS: wallet })
const harvest = await hreq.loadString()

// Get Current Price
const url = 'https://us-central1-fifth-liberty-317301.cloudfunctions.net/GetGiddyPrice'
const req = new Request(url)
const price = await req.loadString()

// Calculate Rewards Value
const hval = Number(harvest) * Number(price)

// Build Widget
let widget = new ListWidget()
widget.useDefaultPadding()
widget.backgroundColor = bgColor

let titleText = widget.addText('GIDDY REWARDS')
titleText.textColor = textColor
titleText.font = Font.semiboldMonospacedSystemFont(10)
titleText.textOpacity = 0.5
titleText.centerAlignText()

widget.addSpacer(25)

let alertText = widget.addText(Number(harvest).toLocaleString(locale, {minimumFractionDigits: 2, maximumFractionDigits: 2}))
alertText.textColor = textColor
alertText.font = Font.boldMonospacedSystemFont(24)
alertText.centerAlignText()

let alertTitle = widget.addText('$'+Number(hval).toLocaleString(locale, {minimumFractionDigits: 2, maximumFractionDigits: 2}))
alertTitle.textColor = textColor
alertTitle.font = Font.semiboldMonospacedSystemFont(10)
alertTitle.textOpacity = 0.5
alertTitle.centerAlignText()

widget.addSpacer(25)

let imgReq = new Request(logo)
let image = await imgReq.loadImage()
let widgetImage = widget.addImage(image)
widgetImage.imageSize = new Size(70,15)
widgetImage.centerAlignImage()

// Display Widget
widget.presentSmall()
Script.setWidget(widget)
Script.complete()
