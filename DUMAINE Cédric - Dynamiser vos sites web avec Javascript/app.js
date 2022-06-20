
let scores, roundScore, activePlayer, gamePlaying;

init();

function init() { //init de la partie.
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    NameChange = updateName;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

//Action sur Bouton Roll DICE.
document.querySelector('.btn-roll').addEventListener('click', () => {
    audio.play('#audio');
    if (gamePlaying) {
        //Numéro au hazar
        let dice = Math.floor(Math.random() * 6) + 1;

        //Afficher le résultat du lancé.
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'Images/dice-' + dice + '.png';

        //Mise à jour du score si le numéro du dé n'est pas egale à 1.
        if (dice !== 1) {
            //Ajoute le score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Sinon Joueur Suivant.
            nextPlayer();
        }
    }
});

//Action sur bouton Hold.
document.querySelector('.btn-hold').addEventListener('click', () => {

    if (gamePlaying) {
        // Ajoute le score courant au score général du joueur.
        scores[activePlayer] += roundScore;

        // Update de l'interface Utilisateur.
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Vérifier si un joueur à gagné la partie.
        if (scores[activePlayer] >= 10) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none'; // cache le dé.

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;

        } else {
            //Joueur Suivant
            nextPlayer();
        }
    }
audio.play('#audio');
});

//Action sur le bouton NewGame
document.querySelector('.btn-new').addEventListener('click', init);
document.querySelector('.btn-new').addEventListener('click', NameChange);

function nextPlayer() {
    //Joueur Suivant
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'block'; // Affiche le Dé n°1

}

function updateName() {

    let player_1Name = prompt('Enter a Player 1 name');
    document.querySelector('#name-0').textContent = player_1Name;


    let player_2Name = prompt('Enter a Player 2 name');
    document.querySelector('#name-1').textContent = player_2Name;

}









