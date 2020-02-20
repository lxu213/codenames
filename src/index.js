import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
// TODO: one turn may include multiple clicks

const CODENAMELIST = ['Hollywood','Well','Foot','New','York','Spring','Court','Tube','Point','Tablet','Slip','Date','Drill','Lemon','Bell','Screen','Fair','Torch','State','Match','Iron','Block','France','Australia','Limousine','Stream','Glove','Nurse','Leprechaun','Play','Tooth','Arm','Bermuda','Diamond','Whale','Comic','Mammoth','Green','Pass','Missile','Paste','Drop','Pheonix','Marble','Staff','Figure','Park','Centaur','Shadow','Fish','Cotton','Egypt','Theater','Scale','Fall','Track','Force','Dinosaur','Bill','Mine','Turkey','March','Contract','Bridge','Robin','Line','Plate','Band','Fire','Bank','Boom','Cat','Shot','Suit','Chocolate','Roulette','Mercury','Moon','Net','Lawyer','Satellite','Angel','Spider','Germany','Fork','Pitch','King','Crane','Trip','Dog','Conductor','Part','Bugle','Witch','Ketchup','Press','Spine','Worm','Alps','Bond','Pan','Beijing','Racket','Cross','Seal','Aztec','Maple','Parachute','Hotel','Berry','Soldier','Ray','Post','Greece','Square','Mass','Bat','Wave','Car','Smuggler','England','Crash','Tail','Card','Horn','Capital','Fence','Deck','Buffalo','Microscope','Jet','Duck','Ring','Train','Field','Gold','Tick','Check','Queen','Strike','Kangaroo','Spike','Scientist','Engine','Shakespeare','Wind','Kid','Embassy','Robot','Note','Ground','Draft','Ham','War','Mouse','Center','Chick','China','Bolt','Spot','Piano','Pupil','Plot','Lion','Police','Head','Litter','Concert','Mug','Vacuum','Atlantis','Straw','Switch','Skyscraper','Laser','Scuba','Diver','Africa','Plastic','Dwarf','Lap','Life','Honey','Horseshoe','Unicorn','Spy','Pants','Wall','Paper','Sound','Ice','Tag','Web','Fan','Orange','Temple','Canada','Scorpion','Undertaker','Mail','Europe','Soul','Apple','Pole','Tap','Mouth','Ambulance','Dress','Ice','Cream','Rabbit','Buck','Agent','Sock','Nut','Boot','Ghost','Oil','Superhero','Code','Kiwi','Hospital','Saturn','Film','Button','Snowman','Helicopter','Loch','Ness','Log','Princess','Time','Cook','Revolution','Shoe','Mole','Spell','Grass','Washer','Game','Beat','Hole','Horse','Pirate','Link','Dance','Fly','Pit','Server','School','Lock','Brush','Pool','Star','Jam','Organ','Berlin','Face','Luck','Amazon','Cast','Gas','Club','Sink','Water','Chair','Shark','Jupiter','Copper','Jack','Platypus','Stick','Olive','Grace','Bear','Glass','Row','Pistol','London','Rock','Van','Vet','Beach','Charge','Port','Disease','Palm','Moscow','Pin','Washington','Pyramid','Opera','Casino','Pilot','String','Night','Chest','Yard','Teacher','Pumpkin','Thief','Bark','Bug','Mint','Cycle','Telescope','Calf','Air','Box','Mount','Thumb','Antarctica','Trunk','Snow','Penguin','Root','Bar','File','Hawk','Battery','Compound','Slug','Octopus','Whip','America','Ivory','Pound','Sub','Cliff','Lab','Eagle','Genius','Ship','Dice','Hood','Heart','Novel','Pipe','Himalayas','Crown','Round','India','Needle','Shop','Watch','Lead','Tie','Table','Cell','Cover','Czech','Back','Bomb','Ruler','Forest','Bottle','Space','Hook','Doctor','Ball','Bow','Degree','Rome','Plane','Giant','Nail','Dragon','Stadium','Flute','Carrot','Wake','Fighter','Model','Tokyo','Eye','Mexico','Hand','Swing','Key','Alien','Tower','Poison','Cricket','Cold','Knife','Church','Board','Cloak','Ninja','Olympus','Belt','Light','Death','Stock','Millionaire','Day','Knight','Pie','Bed','Circle','Rose','Change','Cap','Triangle'];
const REVEALED_CLASSNAMES = ['red','red','red','red','red','red','red','red','red','blue','blue','blue','blue','blue','blue','blue','blue', 'bystander','bystander','bystander','bystander','bystander','bystander','bystander', 'assassin'];
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
      blueRemaining: 9,
      redRemaining: 8,
      showEndTurn: true,
    };
  }

  handleCardClick(i) {
    console.log('--> inside handleCardClick');
    console.log(this.state.cardWords[i], this.state.cardClass[i])

    if (this.state.status === 'game-over') {
      return
    }

    this.updateScore(i);

    // set clickedCardType to cardType to switch css class
    this.state.cardClass[i] = this.state.cardColor[i];

    if (this.state.cardColor[i] === 'bystander' ||
       (this.state.isRedTurn === true && this.state.cardColor[i] === 'blue') ||
       (this.state.isRedTurn === false && this.state.cardColor[i] === 'red')) {
      this.setState({
        isRedTurn: !this.state.isRedTurn,
        status: !this.state.isRedTurn ? 'red-turn' : 'blue-turn',
      })
    } else if (this.state.cardColor[i] === 'assassin') {
      alert('You have chosen the assassin. Game Over.')
      this.setState({
        status: 'game-over',
        showEndTurn: false,
      })
      
    }

    this.setState({
      cardWords: this.state.cardWords,
      cardClass: this.state.cardClass,
      isClueTurn: !this.state.isClueTurn,
    });
    console.log(this.state.cardWords[i], this.state.cardClass[i])
    console.log('isRedTurn', this.state.isRedTurn, 'status', this.status);
    console.log(this.state.blueRemaining, this.state.redRemaining);
  }

  updateScore(i) {
    // only update score if card has not been reveald already
    if (this.state.cardClass[i] !== 'hidden-card') {
      return
    }

    // update red or blue team's score
    if (this.state.isRedTurn === true && this.state.cardColor[i] === 'red') {
      this.setState({
        redRemaining: this.state.redRemaining - 1,
      })
    } else if (this.state.isRedTurn === false && this.state.cardColor[i] === 'blue') {
      this.setState({
        blueRemaining: this.state.blueRemaining - 1,
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
    // apply className="revealed" where the text is colored red or blue
    // may need to learn about making a new class where css can be applied
    console.log('spymaster')
    console.log(this.state.cardWords[i], this.state.cardColor[i])
    const spymasterCardNames = this.state.cardColor.map(card => "spymaster-" + card);
    this.setState({
      cardClass: spymasterCardNames,
    })
    // when clicked, all text should bold and 'status' is used as font-color
  }

  handleAgentClick(i) {
    this.setState({
      cardClass: HIDDEN_CLASSNAMES,
    })
    // when clicked, all text should bold and 'status' is used as font-color
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
    console.log('--> handleSubmit isRedTurn', this.state.isRedTurn, 'status', this.status);
  }

  render() {
    let statusMessage;
    if (this.state.status.includes('-turn')) {
      statusMessage = (this.state.isRedTurn ? 'Red' : 'Blue') + "'s Turn"
    } else {
      statusMessage = (this.state.isRedTurn ? 'Blue' : 'Red').toUpperCase() + " TEAM WINS!"
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
          <button
            className="btn btn-info btn-light"
            onClick={i => this.handleEndTurnClick(i)}>
              {this.state.showEndTurn ? "End Turn" : null}
          </button>
        </div>

        <Board 
          cardWords={this.state.cardWords}
          cardClass={this.state.cardClass}
          onClick={i => this.handleCardClick(i)}
        />

        <div className="info row col-12">
          <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-info btn-light" onClick={i => this.handleAgentClick(i)}>
              Agent
            </label>
            <label class="btn btn-info btn-light" onClick={i => this.handleSpymasterClick(i)}>
              Spymasters
            </label>
          </div>
          <button className="btn btn-info btn-light new-game" onClick={i => this.newGame(i)}>
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

  return shuffle(REVEALED_CLASSNAMES);
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

// function Clue(props) {
//   return (
//     <div 
//       className="clue" 
//       onSubmit={props.onSubmit}>
//         Clue: {props.clue.toUpperCase()}
//     </div>
//   );
// }


        {/* <div className="game-info col-12">
          <div className="clue-display">
            <form onSubmit={e => this.handleSubmit(e)}>
              <label>
                Enter Clue: 
                <input 
                  className="clue-input" 
                  type="text" 
                  name="inputClue" 
                />
              </label>
              <input 
                className="clue-submit" 
                type="submit" 
                value="Submit" 
              />
            </form>
          </div>
          <div className="clue-display">
            <Clue 
              clue={this.state.clue}
              onSubmit={e => this.handleSubmit(e)}
            />
          </div>
          <div className="clue-display">
            <div>
              {this.state.isRedTurn ? 
                "Red" : 
                "Blue"}  
              {this.state.isClueTurn ? 
                "Spymaster, please enter your clue." : 
                "Guesser, please click on guesses."}
            </div>
          </div>          
        </div> */}