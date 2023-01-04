import * as React from "react";

interface ILanding {
}

const Landing: React.FC<ILanding> = (props: ILanding) => {
  return (
    <>
      <h4 style={{ textAlign: 'center', marginBlockStart: '0.66rem', marginBlockEnd: '0.1rem' }}>Questions &amp; Answers</h4>
      <div className="d-flex flex-column justify-content-start align-items-center pt-0 mx-auto border-bottom abouts">
        <p className="mx-auto">
          Make your knowledge base for sharing information.<br/>
          When you record your experiences and insights, other members of your team can share info.
        </p>

        <p className="mx-auto">
          Your questions and answers are stored to "localStorage", which means they are protected od unwanted disclosure.

        </p>

        <p className="mx-auto">
          You can easily export Questions/Answers to the 'zip' file, and send by email to the memebers of your team.
          <br /><br />They can import that 'zip' file into the Web App at their platforms
        </p>

        <p className="mx-auto">
          Most of the software companies need some kind of software for client support.
          As a developer, many times I had to open source code, giving the answer on the questions that we have already answered.
          Instead of complex and expensive Issue trackers, with relations between the issues and so on, which are difficult to learn, you can use this product just after instalation of my "Support" chrome extension.
        </p>

        <h5 style={{ textAlign: 'center', marginBlockStart: '0.66rem', marginBlockEnd: '0.1rem' }}>The Flow</h5>
        <p className="mx-auto">
          <ul>
            <li>User sends you the email with the Question</li>
            <li>You open the mail (Chrome or Edge) clicking on the Support icon that was created by Support chrome extension 
              <br />
            For the time being Support icon is rendered only at pages:
              <ul>
                <li>https://mail.google.com/mail</li>
                <li>https://outlook.live.com/</li>
              </ul>
            supporting only gmail and outlook services, but it can be easily extended for other services.
            </li>
            <li>Extension opens the Support Web App, using email subject as the filter in Question auto-complete</li>
            <li>You copy the selected answer in reply of the mail</li>
          </ul>
        </p>

        <h5 style={{ textAlign: 'center', marginBlockStart: '0.66rem', marginBlockEnd: '0.1rem' }}>Contact</h5>

        <p className="mx-auto">
          Company: <i><b>Stamena</b></i> Software<br/>
          github:
          <ul>
            <li><a href="https://github.com/SlavkoPar/Support-Knowledge" target={"_blank"} rel="noreferrer">Support-Knowledge</a></li>
            <li><a href="https://github.com/SlavkoPar/SupportExt" target={"_blank"} rel="noreferrer">SupportExt</a></li>
          </ul>
          email: <a href="mailto:slavko.parezanin@gmail.com">slavko.parezanin@gmail.com</a>
          <br/>
        </p>

      </div>
    </>
  )
}

export default Landing;
