const teamName = document.getElementById("team");
const typeOfSport = document.getElementById("sport");
const worldCupYear = document.getElementById("year");
const headCoach = document.getElementById("head-coach");
const playerCards = document.getElementById("player-cards");
const playersDropdownList = document.getElementById("players");
const myFavoriteFootballTeam = {
  team: "Galatasaray",
  sport: "Football",
  year: 2024,
  isLeader: true,
  headCoach: {
    coachName: "Okan Buruk",
    matches: 25,
  },
  players: [
    {
      name: "Fernando Muslera",
      position: "goalkeeper",
      number: 1,
      isCaptain: true,
      nickname: "Nando"
    },
    {
      name: "Davinson Sánchez",
      position: "defender",
      number: 6,
      isCaptain: false,
      nickname: "Black Whip"
    },
    {
      name: "Kaan Ayhan",
      position: "midfielder",
      number: 23,
      isCaptain: false,
      nickname: null
    },
    {
      name: "Derrick Köhn",
      position: "defender",
      number: 17,
      isCaptain: false,
      nickname: null
    },
    {
      name: "Victor Nelsson",
      position: "defender",
      number: 25,
      isCaptain: false,
      nickname: "Viking"
    },
    {
      name: "Abdülkerim Bardakcı",
      position: "defender",
      number: 42,
      isCaptain: false,
      nickname: "Gorilla"
    },
    {
      name: "Serge Aurier",
      position: "defender",
      number: 90,
      isCaptain: false,
      nickname: null
    },
    {
      name: "Kerem Demirbay",
      position: "midfielder",
      number: 8,
      isCaptain: false,
      nickname: "Uncle"
    },
    {
      name: "Dries Mertens",
      position: "midfielder",
      number: 10,
      isCaptain: false,
      nickname: null
    },
    {
      name: "Tetê",
      position: "midfielder",
      number: 20,
      isCaptain: false,
      nickname: "no clue"
    },
    {
      name: "Sergio Oliveira",
      position: "midfielder",
      number: 27,
      isCaptain: false,
      nickname: null
    },
    {
      name: "Berkan Kutlu",
      position: "midfielder",
      number: 18,
      isCaptain: false,
      nickname: "Hornet"
    },
    {
      name: "Lucas Torreira",
      position: "midfielder",
      number: 34,
      isCaptain: false,
      nickname: "Dwarf"
    },
    {
      name: "Kerem Aktürkoğlu",
      position: "midfielder",
      number: 7,
      isCaptain: false,
      nickname: null
    },
    {
      name: "Mauro Icardi",
      position: "forward",
      number: 9,
      isCaptain: false,
      nickname: "the Loved one"
    },
    {
      name: "Wilfried Zaha",
      position: "midfielder",
      number: 14,
      isCaptain: false,
      nickname: null
    },
    {
      name: "Hakim Ziyech",
      position: "midfielder",
      number: 22,
      isCaptain: false,
      nickname: "False Hope"
    },
    {
      name: "Barış Alper Yılmaz",
      position: "midfielder",
      number: 53,
      isCaptain: false,
      nickname: "Joker"
    },
    {
      name: "Carlos Vinícius",
      position: "forward",
      number: 95,
      isCaptain: false,
      nickname: null
    },
    {
      name: "Tanguy Ndombele",
      position: "midfielder",
      number: 91,
      isCaptain: false,
      nickname: "Fast Food"
    },
    {
      name: "Efe Akman",
      position: "midfielder",
      number: 83,
      isCaptain: false,
      nickname: "Wonderkid"
    },
    {
      name: "Hamza Yiğit Akman",
      position: "midfielder",
      number: 81,
      isCaptain: false,
      nickname: null
    },
  ],
};

Object.freeze(myFavoriteFootballTeam);
const { sport, team, year, players } = myFavoriteFootballTeam;
const { coachName } = myFavoriteFootballTeam.headCoach;

typeOfSport.textContent = sport;
teamName.textContent = team;
worldCupYear.textContent = year;
headCoach.textContent = coachName;

const setPlayerCards = (arr = players) => {
  playerCards.innerHTML += arr.map(
    ({ name, position, number, isCaptain, nickname }) => `
      <div class="player-card">
        <h2>${name} ${isCaptain ? "(Captain)" : ""}</h2>
        <p>Position: ${position}</p>
        <p>Number: ${number}</p>
        <p>Nickname: ${nickname !== null ? nickname : "N/A"}</p>
      </div>
    `
  ).join("");
};

playersDropdownList.addEventListener("change", (e) => {
  playerCards.innerHTML = '';
  switch (e.target.value) {
    case "nickname":
      setPlayerCards(players.filter(player => player.nickname !== null));
      // Implicit return
    break;
    case "forward":
      setPlayerCards(players.filter((player) => player.position === "forward"));
    break;
    case "midfielder":
      setPlayerCards(players.filter(player => player.position === "midfielder"));
    break;
    case "defender":
      setPlayerCards(players.filter(player => player.position === "defender"));
    break;
    case "goalkeeper":
      setPlayerCards(players.filter(player => player.position === "goalkeeper"));
    break;
    default:
      setPlayerCards();
  }
});