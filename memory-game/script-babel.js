import React from "https://esm.sh/react";

//React compnents needed for project
class PlayFooter extends React.Component {
  //javascript script for code
  // React.Component constructor receives the props object
  constructor(props) {
    super(props);

    this.state = {
      elapsed: 0
    };
  }

  //React components for project Javascript - Babel , converting the ECMAScript 
  componentWillReceiveProps(nextProps) {
    if (nextProps.gameOver !== this.props.gameOver && nextProps.gameOver) {
      clearInterval(this.timer);

      this.setState({ elapsed: 0 });
    }
  }
//React components for project Javascript - Babel , converting the ECMAScript
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ elapsed: this.state.elapsed + 1 });
    }, 1000);
  }
//React components for project Javascript - Babel , converting the ECMAScript
  render() {
    return (
      <div className="footer">
        <p>Turns : {this.props.turns}</p>
        <p>Time : {this.state.elapsed} sec</p>
      </div>
    );
  }
}

//React components for project Javascript - Babel , converting the ECMAScript
// React.Component constructor receives the props object
class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.clickHandle = this.clickHandle.bind(this);
  }

  //React components for project Javascript - Babel , converting the ECMAScript
  clickHandle() {
    if (this.props.status === "unselected") {
      this.props.onClickListener(this.props.index);
    } else {
      console.warn("The tile has already been " + this.props.status);
    }
  }

//React components for project Javascript - Babel , converting the ECMAScript 
  // React.Component constructor receives the props object
  render() {
    return (
      <div
        //check classes
        //connect CSS components 
        onClick={this.clickHandle}
        className={
          "tile " +
          (this.props.status === "selected"
            ? "tile--selected"
            : this.props.status === "matched"
              ? "tile--selected tile--matched"
              : "")
        }
      >
        <div className="tile--front" />
        <div
          className="tile--back"
          style={{ backgroundColor: this.props.accent }}
        >
          {this.props.icon}
        </div>
      </div>
    );
  }
}
//React components for project Javascript - Babel , converting the ECMAScript + added elements to tiles
class PlayArea extends React.Component {
  tiles = [
    {
      name: "tree",
      accent: "#ffcc33",
      icon: "🌳"
    },
    {
      name: "trophy",
      accent: "white",
      icon: "🏆"
    },
    {
      name: "medal",
      accent: "rgb(150, 115, 65)",
      icon: "🏅"
    },
    {
      name: "writing",
      accent: "black",
      icon: "✍️ "
    },
    {
      name: "thinking-face",
      accent: "#DED76E",
      icon: "🤔"
    },
    {
      name: "school",
      accent: "#F9F8E7",
      icon: "🏫"
    },
    {
      name: "sun",
      accent: "#F8ED49",
      icon: "🌞"
    },
    {
      name: "open-book",
      accent: "#EEEDDD",
      icon: "📖"
    }
  ];

  constructor(props) {
    super(props);

    this.state = {
      tiles: [],
      turns: 0,
      activeTile: null
    };

    this.clickHandle = this.clickHandle.bind(this);
    this.resetPlayArea = this.resetPlayArea.bind(this);
  }

  shuffleTiles(tiles) {
    let j, x, i;

    for (i = tiles.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = tiles[i];
      tiles[i] = tiles[j];
      tiles[j] = x;
    }

    return tiles;
  }

  multiplyTiles(tiles) {
    return tiles
      .map(item => {
// Use Object.assign to create a new object rather than passing the same reference twice
        return [item, Object.assign({}, item)];
      })
      .reduce((a, b) => {
      //concat
        return a.concat(b);
      });
  }
//React components for project Javascript - Babel , converting the ECMAScript 
componentWillReceiveProps(nextProps) {
    if (nextProps.gameOver !== this.props.gameOver && !nextProps.gameOver) {
      const newTiles = this.tiles.map(e => {
        e.status = "unselected";

        return e;
      });

      this.setState({
        tiles: this.shuffleTiles(this.multiplyTiles(newTiles))
      });
    }
  }

  clickHandle(index) {
    // Update turns on every click
    this.setState({ turns: this.state.turns + 1 });

    const selectedTile = this.state.tiles[index];
    const updatedTiles = this.state.tiles.slice();

    selectedTile.status = "selected";
    updatedTiles[index] = selectedTile;

    this.setState({
      tiles: updatedTiles
    });

    if (this.state.activeTile === null) {
      this.setState({
        activeTile: selectedTile
      });
    } else if (selectedTile.name === this.state.activeTile.name) {
      let matched = 0;

      const updatedTiles = this.state.tiles.map(e => {
        if (e.name === selectedTile.name) e.status = "matched";
        if (e.status === "matched") matched++;

        return e;
      });

      this.setState({
        tiles: updatedTiles,
        activeTile: null
      });

      //restest the playing area
      if (matched === 16) this.resetPlayArea();
    } else {
      const _this = this;

      //setTimeout 
      setTimeout(function() {
        //update the tiles 
        const updatedTiles = _this.state.tiles.map(e => {
          if (
            e.name === _this.state.activeTile.name ||
            //check selected tile
            e.name === selectedTile.name
          ) {
            e.status = "unselected";
          }

          return e;
        });
//check status
        _this.setState({
          activeTile: null,
          tiles: updatedTiles
        });
      }, 700);
    }
  }

  resetPlayArea() {
 //React components for project Javascript - Babel , converting the ECMAScript  this.props.onGameOver(this.state.turns);

    this.setState({
      tiles: [],
      turns: 0,
      activeTile: null
    });
  }

  //this keyword 
  render() {
    let cindex = 0;
    return (
      <div className="wrapper">
        <h1 className="head"> Memory Game</h1>
        <ul className="area">
          {this.state.tiles.map(e => (
            <Tile
              index={cindex++}
              status={e.status}
              icon={e.icon}
              accent={e.accent}
              onClickListener={this.clickHandle}
            />
          ))}
        </ul>
        {!this.props.gameOver ? (
          <PlayFooter turns={this.state.turns} gameOver={this.props.gameOver} />
        ) : null}
      </div>
    );
  }
}
//React components for project Javascript - Babel , converting the ECMAScript 
class PlayModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.gameOver ? "modal__wrapper" : "hidden"}>
        <div className="modal">
          <div className="modal--top overlay">
            <p>
              <b>Score</b> : {this.props.highestScore} pts
            </p>
          </div>
          <div className="modal--bottom">
            <p>
              Hello student! Want to see how attentive you are? Play this fun, interactive memory tile game.

            </p>
            <button className="play_button" onClick={this.props.onPlayClick}>
               Play 
            </button>
          </div>
        </div>
      </div>
    );
  }
}
//React components for project Javascript - Babel , converting the ECMAScript 
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      score: 0,
      gameOver: true
    };

    this.initCards = this.initCards.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  initCards() {
    this.setState({
      score: 0,
      gameOver: false
    });
  }
// math for game
  restartGame(num_turns) {
    const score = Math.round(120 / num_turns * 100);

    //check game status 
    this.setState({
      score: score,
      gameOver: true
    });
  }
//React components for project Javascript - Babel , converting the ECMAScript 
  render() {
    return (
      <div>
        <PlayModal
          gameOver={this.state.gameOver}
          highestScore={this.state.score}
          onPlayClick={this.initCards}
        />
        <PlayArea
          gameOver={this.state.gameOver}
          onGameOver={this.restartGame}
        />
      </div>
    );
  }
}

//React DOM components for project Javascript - Babel , converting the ECMAScript 
ReactDOM.render(<App />, document.getElementById("memory-game"));
