import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
// TODO: handleSubmit, change css on click


const CODENAMELIST = ['Hollywood','Well','Foot','New','York','Spring','Court','Tube','Point','Tablet','Slip','Date','Drill','Lemon','Bell','Screen','Fair','Torch','State','Match','Iron','Block','France','Australia','Limousine','Stream','Glove','Nurse','Leprechaun','Play','Tooth','Arm','Bermuda','Diamond','Whale','Comic','Mammoth','Green','Pass','Missile','Paste','Drop','Pheonix','Marble','Staff','Figure','Park','Centaur','Shadow','Fish','Cotton','Egypt','Theater','Scale','Fall','Track','Force','Dinosaur','Bill','Mine','Turkey','March','Contract','Bridge','Robin','Line','Plate','Band','Fire','Bank','Boom','Cat','Shot','Suit','Chocolate','Roulette','Mercury','Moon','Net','Lawyer','Satellite','Angel','Spider','Germany','Fork','Pitch','King','Crane','Trip','Dog','Conductor','Part','Bugle','Witch','Ketchup','Press','Spine','Worm','Alps','Bond','Pan','Beijing','Racket','Cross','Seal','Aztec','Maple','Parachute','Hotel','Berry','Soldier','Ray','Post','Greece','Square','Mass','Bat','Wave','Car','Smuggler','England','Crash','Tail','Card','Horn','Capital','Fence','Deck','Buffalo','Microscope','Jet','Duck','Ring','Train','Field','Gold','Tick','Check','Queen','Strike','Kangaroo','Spike','Scientist','Engine','Shakespeare','Wind','Kid','Embassy','Robot','Note','Ground','Draft','Ham','War','Mouse','Center','Chick','China','Bolt','Spot','Piano','Pupil','Plot','Lion','Police','Head','Litter','Concert','Mug','Vacuum','Atlantis','Straw','Switch','Skyscraper','Laser','Scuba','Diver','Africa','Plastic','Dwarf','Lap','Life','Honey','Horseshoe','Unicorn','Spy','Pants','Wall','Paper','Sound','Ice','Tag','Web','Fan','Orange','Temple','Canada','Scorpion','Undertaker','Mail','Europe','Soul','Apple','Pole','Tap','Mouth','Ambulance','Dress','Ice','Cream','Rabbit','Buck','Agent','Sock','Nut','Boot','Ghost','Oil','Superhero','Code','Kiwi','Hospital','Saturn','Film','Button','Snowman','Helicopter','Loch','Ness','Log','Princess','Time','Cook','Revolution','Shoe','Mole','Spell','Grass','Washer','Game','Beat','Hole','Horse','Pirate','Link','Dance','Fly','Pit','Server','School','Lock','Brush','Pool','Star','Jam','Organ','Berlin','Face','Luck','Amazon','Cast','Gas','Club','Sink','Water','Chair','Shark','Jupiter','Copper','Jack','Platypus','Stick','Olive','Grace','Bear','Glass','Row','Pistol','London','Rock','Van','Vet','Beach','Charge','Port','Disease','Palm','Moscow','Pin','Washington','Pyramid','Opera','Casino','Pilot','String','Night','Chest','Yard','Teacher','Pumpkin','Thief','Bark','Bug','Mint','Cycle','Telescope','Calf','Air','Box','Mount','Thumb','Antarctica','Trunk','Snow','Penguin','Root','Bar','File','Hawk','Battery','Compound','Slug','Octopus','Whip','America','Ivory','Pound','Sub','Cliff','Lab','Eagle','Genius','Ship','Dice','Hood','Heart','Novel','Pipe','Himalayas','Crown','Round','India','Needle','Shop','Watch','Lead','Tie','Table','Cell','Cover','Czech','Back','Bomb','Ruler','Forest','Bottle','Space','Hook','Doctor','Ball','Bow','Degree','Rome','Plane','Giant','Nail','Dragon','Stadium','Flute','Carrot','Wake','Fighter','Model','Tokyo','Eye','Mexico','Hand','Swing','Key','Alien','Tower','Poison','Cricket','Cold','Knife','Church','Board','Cloak','Ninja','Olympus','Belt','Light','Death','Stock','Millionaire','Day','Knight','Pie','Bed','Circle','Rose','Change','Cap','Triangle'];
const WORDTYPES = ['red','red','red','red','red','red','red','red','red','blue','blue','blue','blue','blue','blue','blue','blue', 'bystander','bystander','bystander','bystander','bystander','bystander','bystander', 'assassin'];

function Card(props) {
  return (
    // className={props.cardType}
    <button className="card" onClick={props.onClick}>
      {props.word} 
    </button>
  );
}

function Clue(props) {
  return (
    <div className="clue" onSubmit={props.onSubmit}>
      Current Clue: {props.clue}
    </div>
  );
}

class Board extends React.Component {
  renderCard(i) {
    return (
      <Card 
        word={this.props.cards[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    console.log('rendering board...')

    return (
      <div>
        <div className="board-row">
          {this.renderCard(0)}
          {this.renderCard(1)}
          {this.renderCard(2)}
          {this.renderCard(3)}
          {this.renderCard(4)}
        </div>
        <div className="board-row">
          {this.renderCard(5)}
          {this.renderCard(6)}
          {this.renderCard(7)}
          {this.renderCard(8)}
          {this.renderCard(9)}
        </div>
        <div className="board-row">
          {this.renderCard(10)}
          {this.renderCard(11)}
          {this.renderCard(12)}
          {this.renderCard(13)}
          {this.renderCard(14)}
        </div>
        <div className="board-row">
          {this.renderCard(15)}
          {this.renderCard(16)}
          {this.renderCard(17)}
          {this.renderCard(18)}
          {this.renderCard(19)}
        </div>
        <div className="board-row">
          {this.renderCard(20)}
          {this.renderCard(21)}
          {this.renderCard(22)}
          {this.renderCard(23)}
          {this.renderCard(24)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Codenames',
      cards: initializeCardWords(),
      cardTypes: initializeCardTypes(),
      clue: 'coconut',
      isRedTurn: false,
      isClueTurn: false
    };
  }

  // toggle red/blue and clue/guess on Clicks, update card state
  handleClick(i) {
    console.log('inside handleClick')
    // cards[i] = this.state.isCardRed ? "Red" : "Blue";
    this.state.cards[i] = this.state.cardTypes[i];  // how to not mutate directly?
    this.setState({
      cards: this.state.cards,
      isRedTurn: !this.state.isRedTurn,
      isClueTurn: !this.state.isClueTurn,
    });
  }

  // toggle only clue/guess on Change
  handleSubmit(e) { 
    // is restarting the entire Game
    console.log('*********** inside handleSubmit *****************');
    e.preventDefault();  // prevent refresh of game on each submit
    this.setState({
      clue: e.target[0].value,
      // clue: e.target[0].value
      isClueTurn: !this.state.isClueTurn,
    });
  }

  render() {
    console.log('rendering game...')
    return (
      <div className="game">
        <div className="game-board">
            <Board 
              cards={this.state.cards}
              cardTypes={this.state.cardTypes}
              onClick={i => this.handleClick(i)} 
            />
        </div>

        <div className="game-info">
          <div>{ this.state.title }</div>
          <div className="clue-submit">
            <form onSubmit={e => this.handleSubmit(e)}>
              <label>
                Enter Clue:
                <input type="text" name="clue" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
          <div className="clue-display">
            <Clue 
              clue={this.state.clue}
              onSubmit={e => this.handleSubmit(e)}
            />
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function initializeCardWords() {
  // Returns a list of 25 unique word strings
  // Index indicates card position on board
  var word = '';
  var dict = {};

  // dedupe using dict
  while (Object.keys(dict).length < 25) {
    word = CODENAMELIST[Math.floor(Math.random() * CODENAMELIST.length)];
    dict[word] = 0;
  }

  return Object.keys(dict);
}


function initializeCardTypes() {
  // Returns a list of 25 unique word types
  // Index indicates card position on board

  return shuffle(WORDTYPES);
}


function shuffle(array) {
  // Fisher-Yates Shuffle
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) { // while there are elements to shuffle

    // pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // and swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
