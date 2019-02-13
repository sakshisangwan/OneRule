var nodemailer = require('nodemailer');
module.exports = {

  // ------------------- When a condition for a rule is met ---------------------------
        conditionMail: (receiver,campaignName,ruleName,success, req, res) => {
            new Promise(function(resolve, reject) {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: "******", // sender's gmail address
                        pass: "******"  // sender's gmail password
                    }
                });
                var helperOptions = {
                    from: '******',    // email from which the mail has to be sent
                    to: receiver.toString(),
                    subject: 'Condition Met',
                    html: `Hey, the condition for campaign: ` + campaignName + ` has met for rule: ` + ruleName + `.`

                };
                transporter.sendMail(helperOptions, (error, resp) => {

                    if (error) {
                        return resp.send({
                            message: "Something went wrong while sending mail.",
                            statusCode: 400,
                            result: error
                        })
                    } else {
                        return resp.send({
                            message: "Mail sent successfully.",
                            statusCode: 200,
                            result: success
                        })
                    }
                });
            })
        }
      }