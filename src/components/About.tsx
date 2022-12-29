import * as React from "react";

interface ILanding {
}

const Landing: React.FC<ILanding> = (props: ILanding) => {
  return (
    <>
      <h2 style={{ textAlign: 'center', marginBlockStart: '0.66rem', marginBlockEnd: '0.1rem' }}>Questions &amp; Answers</h2>
      <div className="d-flex flex-column justify-content-start align-items-center pt-0 mx-auto border-bottom abouts">
        <p className="mx-auto">
          Make your knowledge base for sharing information.
        </p>
        <p className="mx-auto">
          When you record your experiences and insights, other members of your team can share info.
        </p>

        <p className="mx-auto">
          Your questions and answers are stored to localStorage, which means they are protected od unwanted disclosure.
        </p>

        <p className="mx-auto">
          You can easily export Questions/Answers to the 'zip' file, and send by email to the memebers of your team.
          <br /><br />They can import that 'zip' file into the Web App at their platforms
        </p>

        <p className="mx-auto">
          Most of the software companies need some kind of software like this.
          As the developer, many times I had to open source code, giving the answer on the questions that we have already answered.
          Instead of complex and expensive Issue trackers, with relations between the issues and so on, which are difficult to learn, you can use this product just after instalation of Support chrome extension.
        </p>

        <h4 style={{ textAlign: 'center', marginBlockStart: '0.66rem', marginBlockEnd: '0.1rem' }}>The Flow</h4>
        <p className="mx-auto">
          <ul>
            <li>User sends you the email with the Question</li>
            <li>You open the mail (Chrome or Edge) and click on the Support icon that was created by Support chrome extension </li>
            <li>Extension opens the Support Web App, using email subject as the filter in Question auto-complete</li>
            <li>You copy the selected answer in reply of the mail</li>
          </ul>
        </p>
      </div>
    </>
  )
}

export default Landing;
