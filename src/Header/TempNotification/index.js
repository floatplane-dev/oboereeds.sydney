import "./styles.scss";
import React from "react";

function TempNotification() {
  return (
    <section>
      <div className="notification">
        <h1>Orders Notification</h1>
        <p>
          Orders placed from the 3rd May - 8th August will not be filled until
          the 15th August. Please place orders early to avoid disapointment!
        </p>
        <p>Thanks, Sydney Oboe Reeds 🎵</p>
      </div>
    </section>
  );
}

export default TempNotification;
