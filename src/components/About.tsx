import * as React from "react";

interface ILanding {
}

const Landing: React.FC<ILanding> = (props: ILanding) => {
  return (
    <>
      <h2 style={{ textAlign: 'center', marginBlockStart: '0.66rem', marginBlockEnd: '0.1rem' }}>Questions &amp; Answers</h2>
      <div className="d-flex flex-column justify-content-start align-items-center pt-3 mx-auto border-bottom">
        <p className="mx-auto">
          A knowledge base for sharing information.
        </p>
        <p className="mx-auto">
          When you record your experiences and insights, other members of your team can share info.
        </p>
      </div>
    </>
  )
}

export default Landing;
