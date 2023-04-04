class Script {
  /**
   * @params {object} request
   */
  process_incoming_request({ request }) {
    let message    = JSON.parse(request.content_raw).Message;
    message        = JSON.parse(message);
    let dimensions = message.Trigger.Dimensions;
  
    let fields = [
      { "title": "Time", "value": new Date(message.StateChangeTime).toLocaleString(), "short": false },
      { "title": "Account", "value": message.AWSAccountId, "short": false },
      { "title": "Old state", "value": message.OldStateValue, "short": false },
      { "title": "New state", "value": message.NewStateValue, "short": false },
    ]

    if (dimensions.length > 0) {
      for (let dimension in dimensions) {
        fields.push({ "title": dimensions[dimension].name, "value": dimensions[dimension].value, "short": false },)
      }
    }

    return {
      text: 'Alarm',
      content:{
        "attachments": [{
          "color": "#FF0000",
          "author_name": 'CloudWatch Alarm',
          "author_link": "",
          "author_icon": "https://static.vecteezy.com/system/resources/previews/012/042/292/original/warning-sign-icon-transparent-background-free-png.png",
          "title": `${message.AlarmName} | ${message.Region}`,
          "title_link": "",
          "text": `:rotating_light: ${message.NewStateReason} :rotating_light:`,
          "fields": fields,
        }]
       }
    };
  }
}
