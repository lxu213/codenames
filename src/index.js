import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { REVEALED_CLASSNAMES } from './constants';


const CODENAMELIST = ['Hollywood','Well','Foot','New','York','Spring','Court','Tube','Point','Tablet','Slip','Date','Drill','Lemon','Bell','Screen','Fair','Torch','State','Match','Iron','Block','France','Australia','Limousine','Stream','Glove','Nurse','Leprechaun','Play','Tooth','Arm','Bermuda','Diamond','Whale','Comic','Mammoth','Green','Pass','Missile','Paste','Drop','Pheonix','Marble','Staff','Figure','Park','Centaur','Shadow','Fish','Cotton','Egypt','Theater','Scale','Fall','Track','Force','Dinosaur','Bill','Mine','Turkey','March','Contract','Bridge','Robin','Line','Plate','Band','Fire','Bank','Boom','Cat','Shot','Suit','Chocolate','Roulette','Mercury','Moon','Net','Lawyer','Satellite','Angel','Spider','Germany','Fork','Pitch','King','Crane','Trip','Dog','Conductor','Part','Bugle','Witch','Ketchup','Press','Spine','Worm','Alps','Bond','Pan','Beijing','Racket','Cross','Seal','Aztec','Maple','Parachute','Hotel','Berry','Soldier','Ray','Post','Greece','Square','Mass','Bat','Wave','Car','Smuggler','England','Crash','Tail','Card','Horn','Capital','Fence','Deck','Buffalo','Microscope','Jet','Duck','Ring','Train','Field','Gold','Tick','Check','Queen','Strike','Kangaroo','Spike','Scientist','Engine','Shakespeare','Wind','Kid','Embassy','Robot','Note','Ground','Draft','Ham','War','Mouse','Center','Chick','China','Bolt','Spot','Piano','Pupil','Plot','Lion','Police','Head','Litter','Concert','Mug','Vacuum','Atlantis','Straw','Switch','Skyscraper','Laser','Scuba','Diver','Africa','Plastic','Dwarf','Lap','Life','Honey','Horseshoe','Unicorn','Spy','Pants','Wall','Paper','Sound','Ice','Tag','Web','Fan','Orange','Temple','Canada','Scorpion','Undertaker','Mail','Europe','Soul','Apple','Pole','Tap','Mouth','Ambulance','Dress','Ice','Cream','Rabbit','Buck','Agent','Sock','Nut','Boot','Ghost','Oil','Superhero','Code','Kiwi','Hospital','Saturn','Film','Button','Snowman','Helicopter','Loch','Ness','Log','Princess','Time','Cook','Revolution','Shoe','Mole','Spell','Grass','Washer','Game','Beat','Hole','Horse','Pirate','Link','Dance','Fly','Pit','Server','School','Lock','Brush','Pool','Star','Jam','Organ','Berlin','Face','Luck','Amazon','Cast','Gas','Club','Sink','Water','Chair','Shark','Jupiter','Copper','Jack','Platypus','Stick','Olive','Grace','Bear','Glass','Row','Pistol','London','Rock','Van','Vet','Beach','Charge','Port','Disease','Palm','Moscow','Pin','Washington','Pyramid','Opera','Casino','Pilot','String','Night','Chest','Yard','Teacher','Pumpkin','Thief','Bark','Bug','Mint','Cycle','Telescope','Calf','Air','Box','Mount','Thumb','Antarctica','Trunk','Snow','Penguin','Root','Bar','File','Hawk','Battery','Compound','Slug','Octopus','Whip','America','Ivory','Pound','Sub','Cliff','Lab','Eagle','Genius','Ship','Dice','Hood','Heart','Novel','Pipe','Himalayas','Crown','Round','India','Needle','Shop','Watch','Lead','Tie','Table','Cell','Cover','Czech','Back','Bomb','Ruler','Forest','Bottle','Space','Hook','Doctor','Ball','Bow','Degree','Rome','Plane','Giant','Nail','Dragon','Stadium','Flute','Carrot','Wake','Fighter','Model','Tokyo','Eye','Mexico','Hand','Swing','Key','Alien','Tower','Poison','Cricket','Cold','Knife','Church','Board','Cloak','Ninja','Olympus','Belt','Light','Death','Stock','Millionaire','Day','Knight','Pie','Bed','Circle','Rose','Change','Cap','Triangle'];

const HIDDEN_CLASSNAMES = new Array(25).fill('hidden-card');

function Card(props) {
  return (
    <button 
      className={props.cardClass} 
      onClick={props.onClick}>
        {props.word}
    </button>
  );
}

function EndTurn(props) {
  if (props.endTurn) { // game is active
    return (
      <button
        className="btn btn-info btn-light"
        onClick={props.onClick}>
          End Turn
      </button>
    )
  } else { // game over 
    const message = (props.winner).toUpperCase() + " TEAM WINS!"
    return (
      <div className={"turn col " + props.status}>{message}</div>
    )
  }
}

function Gear(props) {
  return (
    <div
      className="gear"
      onClick={props.onClick}>
      <svg width="30" height="30" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.3344 4.86447L24.31 8.23766C21.9171 9.80387 21.1402 12.9586 22.5981 15.4479C23.038 16.1989 23.6332 16.8067 24.3204 17.2543L22.2714 20.7527C20.6682 19.9354 18.6888 19.9151 17.0088 20.8712C15.3443 21.8185 14.3731 23.4973 14.2734 25.2596H10.3693C10.3241 24.4368 10.087 23.612 9.64099 22.8504C8.16283 20.3266 4.93593 19.4239 2.34593 20.7661L0.342913 17.3461C2.85907 15.8175 3.70246 12.5796 2.21287 10.0362C1.74415 9.23595 1.09909 8.59835 0.354399 8.14386L2.34677 4.74208C3.95677 5.5788 5.95446 5.60726 7.64791 4.64346C9.31398 3.69524 10.2854 2.0141 10.3836 0.25H14.267C14.2917 1.11932 14.5297 1.99505 15.0012 2.80013C16.4866 5.33635 19.738 6.23549 22.3344 4.86447ZM15.0038 17.3703C17.6265 15.8776 18.5279 12.5685 17.0114 9.97937C15.4963 7.39236 12.1437 6.50866 9.52304 8.00013C6.90036 9.4928 5.99896 12.8019 7.5154 15.391C9.03058 17.978 12.3832 18.8617 15.0038 17.3703Z" transform="translate(12.7548) rotate(30)" fill="#EEE" stroke="#BBB" strokeWidth="0.5"></path>          
      </svg>
    </div>
  );
}

class Board extends React.Component {
  renderCard(i) {
    return (
      <Card 
        word={this.props.cardWords[i].toUpperCase()}
        cardClass={this.props.cardClass[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
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
      cardWords: initializeCardWords(),
      cardColor: initializeCardRevealed(),    // css class: hidden-card, red, blue
      cardClass: HIDDEN_CLASSNAMES,           // initial classNames are 'hidden-card'
      clue: '',
      isRedTurn: false,
      isClueTurn: true,
      status: 'blue-turn',
      blueRemaining: 8,
      redRemaining: 9,
      showEndTurn: true,
      view: 'agent',
      winner: '',
    };
  }

  handleCardClick(i) {
    if (this.state.status.includes('game-over') || this.state.view === 'spymaster') {
      return null // disable clicking 
    }
    this.updateScore(i);
    this.state.cardClass[i] = this.state.cardColor[i]; // switch css classNames

    if (this.state.cardColor[i] === 'bystander' ||
       (this.state.isRedTurn === true && this.state.cardColor[i] === 'blue') ||
       (this.state.isRedTurn === false && this.state.cardColor[i] === 'red')) {
      this.setState({
        isRedTurn: !this.state.isRedTurn,
        status: !this.state.isRedTurn ? 'red-turn' : 'blue-turn',
      })
    } else if (this.state.cardColor[i] === 'assassin') {
      alert('You have chosen the assassin. Game Over.')
      const status = "game-over-" + (this.state.isRedTurn ? 'blue' : 'red');
      this.setState({
        status: status,
        showEndTurn: false,
        winner: (this.state.isRedTurn ? 'Blue' : 'Red'),
      })
    } 

    this.setState({
      cardWords: this.state.cardWords,
      cardClass: this.state.cardClass,
      isClueTurn: !this.state.isClueTurn,
    });
  }

  updateScore(i) {
    // only update score if card has not been revealed already
    if (this.state.cardClass[i] !== 'hidden-card') {
      return null
    }

    // update red or blue team's score
    if (this.state.cardColor[i] === 'red') {
      this.setState({
        redRemaining: this.state.redRemaining - 1,
      })
    } else if (this.state.cardColor[i] === 'blue') {
      this.setState({
        blueRemaining: this.state.blueRemaining - 1,
      })    
    }
    // check if game is over
    if (this.state.redRemaining === 1 || this.state.blueRemaining === 1) {
      const status = "game-over-" + (this.state.isRedTurn ? 'red' : 'blue');
      this.setState({
        status: status,
        showEndTurn: false,
        winner: (this.state.isRedTurn ? 'Red' : 'Blue'),
      })
    }
  }

  handleEndTurnClick(i) {
    this.setState({
      isRedTurn: !this.state.isRedTurn,
      status: !this.state.isRedTurn ? 'red-turn' : 'blue-turn',
    })
  }

  handleSpymasterClick(i) {
    // do not map cards that aren't "hiddencard" for class
    const spymasterCardNames = this.state.cardClass.map((card, i) => {
      if (card === 'hidden-card') {
        return "spymaster-" + this.state.cardColor[i]
      } else {        
        return card
      }
      
    });
    this.setState({
      cardClass: spymasterCardNames,
      view: 'spymaster',
    })
    // when clicked, all text should bold and 'status' is used as font-color
  }

  handleAgentClick(i) {
    this.setState({
      cardClass: HIDDEN_CLASSNAMES,
      view: 'agent',
    })
    // when clicked, all text should bold and 'status' is used as font-color
  }

  handleGearClick(i) {
    alert('How to play codenames: https://www.youtube.com/watch?v=zQVHkl8oQEU');
  }

  newGame(i) {
    window.location.reload(false);
  }

  // toggle only clue/guess on Change
  handleSubmit(e) { 
    // prevent refresh of game on each submit
    e.preventDefault();     
    this.setState({
      inputClue: '',    
      clue: e.target[0].value,
      isClueTurn: !this.state.isClueTurn,
    });
    // clear input box after setting state with clue
    e.target[0].value = ""  
  }

  render() {
    let statusMessage;
    if (this.state.status.includes('-turn')) {
      statusMessage = (this.state.isRedTurn ? 'Red' : 'Blue') + "'s Turn"
    } else {
      statusMessage = null
    }

    let agentView;
    let spyView;
    if (this.state.view === 'agent') {
      agentView = 'gray-click'
    } else {
      spyView = 'gray-click'
    }

    return (
      
      <div className="game">
        <div className="title col-12">Codenames</div>
        <div className="info row col-12">
          <div className="scoreboard col-1">
            <span className="blue-turn">{this.state.blueRemaining}</span>
              &nbsp;–&nbsp; 
            <span className="red-turn">{this.state.redRemaining}</span>
          </div>
          <div className={"turn col " + this.state.status}>{statusMessage}</div>
          <EndTurn
            onClick={i => this.handleEndTurnClick(i)}
            endTurn={this.state.showEndTurn}
            status={this.state.status}
            isRedTurn={this.state.isRedTurn}
            winner={this.state.winner}
          />
        </div>

        <Board 
          cardWords={this.state.cardWords}
          cardClass={this.state.cardClass}
          onClick={i => this.handleCardClick(i)}
        />

        <div className="info row col-12">
          <Gear
            onClick={i => this.handleGearClick(i)}
          />
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label
              className={"btn btn-info btn-light " + agentView} 
              onClick={i => this.handleAgentClick(i)}>
                Agent
            </label>
            <label 
              className={"btn btn-info btn-light " + spyView}
              onClick={i => this.handleSpymasterClick(i)}>
                Spymasters
            </label>
          </div>
          <button
            className="btn btn-info btn-light new-game" onClick={i => this.newGame(i)}>
              New Game
          </button>
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
  // Index indicates hidden-card position on board
  var word = '';
  var dict = {};

  // dedupe using dict
  while (Object.keys(dict).length < 25) {
    word = CODENAMELIST[Math.floor(Math.random() * CODENAMELIST.length)];
    dict[word.toUpperCase()] = 0;
  }

  return Object.keys(dict);
}


function initializeCardRevealed() {
    // Returns a list of 25 unique word types
    // Index indicates hidden-card position on board
    const RED = 9;
    const BLUE = 8;
    const BYSTANDER = 7;
    const ASSASSIN = 1;

    const revealedClassnames = [];

    for (let i=0; i < (RED); i++) {
        revealedClassnames.push(REVEALED_CLASSNAMES.red)
    }
    for (let i=0; i < (BLUE); i++) {
        revealedClassnames.push(REVEALED_CLASSNAMES.blue)
    }
    for (let i=0; i < (BYSTANDER); i++) {
        revealedClassnames.push(REVEALED_CLASSNAMES.bystander)
    }
    for (let i=0; i < (ASSASSIN); i++) {
        revealedClassnames.push(REVEALED_CLASSNAMES.assassin)
    }

    return shuffle(revealedClassnames);
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
