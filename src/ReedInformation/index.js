import React, { Component } from "react";

class ReedInformation extends Component {
  render() {
    return (
      <div id="reed-information" className="gutters">

        <section className="fold1">
          <div className="left-right-wrapper">
            <div>
              <h2>Reed Information</h2>
              <h1>What is a reed?</h1>
              <h3>An introduction to and important information on reeds</h3>
              <p>A reed is the apparatus a player blows into to sound their instrument. Instruments such as the clarinet, saxophone, bassoon and oboe all use reeds to produce their sound. The clarinet and saxophone are single reeded instruments whereas the oboe and bassoon have special double reeds.</p>
              <p>Simply put, single reeds are one piece of scraped wood (called cane) which are placed against a mouthpiece. The reed vibrates against the mouthpiece when blown to create sound. Double reeds are two pieces of scraped cane which vibrate against themselves without the aid of a mouthpiece.</p>
            </div>
            <div className="image1"/>
          </div>

          <p>Double reeds are far more complicated than single reeds as they must strike a balance between both blades of cane working harmoniously together to produce sound. Reed makers play a balancing act between many inconsistencies as they are working with natural material (cane). No two pieces of cane are the same. Cane strength, density, and fibre structure is uniquely different, so every reed is an individual work of art. It takes many years to learn the craft of reed making. There is the skill of scraping the reed and learning all the possible shapes one can scrape, the impact of these shapes on the reed and how to balance a reed for the best response and tone colour. These shapes are measured in millimetres and even the slightest change in shape will have a dramatic effect on the reed.</p>

          <div className="image2"/>

          <p>There are many components to a reed mainly being: the staple, thread and cane. All these components are specialist parts and need to be painstakingly sourced for the best result. Oboe Sydney Reeds import our premium parts from France and are all professional materials. Here, there is a balancing act as staples, thread and cane all come in a vast variety of shapes and sizings. Through years of experimentation, expert discourse and love we’ve found the perfect balance of these materials to create our premium oboe reeds.</p>
        </section>

        <section className="fold2">
          <div className="left-right-wrapper">
            <h1>European <br/>vs. <br/>American</h1>
            <div className="reed-comparison">
              <div className="image1"/>
              <div className="image2"/>
            </div>
          </div>

          <p>There are two main schools of reed making - the European and American. The main difference between these two schools is their differing scrape styles. The ‘scrape’ of a reed refers to where a reed maker has scraped or carved the face of a reed.</p>
          <p>The American scrape (used across America) runs the entire length of the reed. Scraping to this degree is thought to make a lighter, easier reed. However, this lightness of the reed sacrifices the tone colour or sound of the reed and has often been referred to as sounding ‘duck like’.</p>
          <p>The European scrape (used in Australia and throughout Europe) only scrapes half of the reed not the entire length. This leaves more cane on the reed and in turn produces a more beautiful, dark, rich tone. The question then is, are European reeds more difficult to play? The simple answer is no. A quality reed maker will scrape a European style reed in a shape that allows for vibrations to travel easily, without resistance through the reed. The tip is carved to be paper thin and allows for easy blowing.</p>
          <p>It is important to know the difference between these two types of reeds when purchasing. The techniques used to play these reed types differs and students should not be changing between the two styles. Especially in their early learning phases as it will alter their establishing embouchure (mouth formation on reed). In Australia the European scrape is used. You will not see any professionals using anything else!</p>

        </section>


        <section className="fold3">
          <div className="left-right-wrapper">
            <h1>Climate and Natural Materials</h1>
            <p>The main component of a reed is the cane. This is produced from the plant Arundo Donax, a tall perennial cane and a relative to bamboo. Because such a large component is made from a natural material no two reeds are the same. This also makes reeds especially vulnerable to differing climates and weather conditions. Many professional oboists carry their reeds in cases that specifically monitor the humidity and adjust this to their optimal conditions. To further this; when traveling overseas professional oboists will often craft completely new reeds on location to accommodate the change in climate. It is because of this change that having reeds produced locally and in a similar climate is important. What works in one country may not work in another. Next time it rains, see if your reeds have absorbed the extra water in the air and hardened.</p>
          </div>
        </section>

        <section className="fold4">
          <div className="left-right-wrapper">
            <div className="image1"/>
            <div>
              <h1>When to replace a reed</h1>
              <p>
                It’s time to replace a reed when it has split, chipped, is misshapen or aged (3+ months old). Keep an eye out for discolouring, sometimes when a reed has not properly aired out or dried after use and is put back into its case this can be the perfect environment for mould to grow. For this reason and other hygiene reasons we recommend replacing reeds at the latest at 3 months of age.
              </p>
            </div>
          </div>
        </section>

      </div>
    );
  }
}

export default ReedInformation;
