# Django.
from django.shortcuts import render
from django.template.loader import get_template
from django.conf import settings

# Rest API.
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

# Sengrid API
import sendgrid
from sendgrid.helpers.mail import (
	Mail, 
	Email, 
	Content, 
	CustomArg, 
	Attachment, 
	Personalization,
)

# Other
from string import Template

def mess_formater(mess, **parms):
	return Template(mess).substitute(**parms)

# Create your views here.
class EmailApi(viewsets.ViewSet):
	MESSAGUESS = {
  		"success":"Succesfully emailed to $receiver .",
  		"invalid_email":"$receiver is not valid .",
  	}
	def send(
			self,
			content,
			subject,
			sender,
			receiver=settings.YOUR_EMAIL,
			context={},
			traking_id=None
		):
		sg = sendgrid.SendGridAPIClient(apikey=settings.EMAIL_API_KEY)
		from_email = Email(sender)
		to_email = Email(receiver)
		content = Content("text/html", content)
		mail = Mail(from_email, subject, to_email, content)

		# Adding attachments:
		for att_content in context.get("attachments",{}):
			attachment = Attachment()
			attachment.content = base64.b64encode(att_content["content"]).decode("utf-8")
			attachment.content_id = att_content.get("content_id","")
			attachment.disposition = att_content.get("disposition","")
			attachment.filename = att_content.get("filename","")
			attachment.type = att_content.get("type","")
			mail.add_attachment(attachment)

		# Adding additional arguments to the email
		for key,value in context.get("cutom_arguments",{}).items():    
			mail.add_custom_arg(CustomArg(key, value))
		print("I had reached this point")
		# Try to send email:
		try:
			email_as_json = mail.get()
			response = sg.client.mail.send.post(request_body=email_as_json)
			return ({
				"was_sent":True,
				"reason":mess_formater(
					EmailApi.MESSAGUESS['success'],
					receiver=receiver,
				),
			})

		except Exception as e:
			print(str(e))
			return ({
				"was_sent":False,
				"reason":mess_formater(
					EmailApi.MESSAGUESS['invalid_email'],
					receiver=receiver,
				),
			})

	def send_api(self, request, **kwargs):
	    """
		TYPE: POST
	    """
	    # Create html file.
	    content = get_template('basic_email.html').render({
	    	"name":self.request.query_params.get('name',''),
	    	"comments":self.request.query_params.get('comments',''),
	    })
	    # Try to send an email.
	    resp = self.send(
	    	content=content,
			subject=self.request.query_params.get('subject',''),
	    	sender=self.request.query_params.get('sender',''),
	    	receiver=self.request.query_params.get('receiver',''),
	    )
	    return Response(resp)