import smtplib 
import sys
from email.message import EmailMessage

s = smtplib.SMTP('smtp.gmail.com', 587) 
  
s.starttls()
SENDER = "noreplymailfortest@gmail.com"
s.login("noreplymailfortest@gmail.com", "donotreply123")
RECEIVER  = sys.argv[1]
OTP = sys.argv[2]

msg = EmailMessage()
msg.set_content('Enter This Credentials to Verify Account \nEmail : ' + RECEIVER + "\nOTP : " + OTP)
print("hey")
msg['Subject'] = 'Verify Account'
msg['From'] = SENDER
msg['To'] = RECEIVER
print(msg)
s.send_message(msg )  
s.quit()