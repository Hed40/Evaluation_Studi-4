let scores, roundScore, activePlayer, gamePlaying;

document.querySelector('.btn-new').style.display = 'block';
document.querySelector('.btn-roll').style.display = 'none';
document.querySelector('.btn-hold').style.display = 'none';
document.querySelector('.dice').style.display = 'none';

//init de la partie.
function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    NameChange = updateName;

    document.querySelector('.btn-new').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('.dice').style.display = 'block';/*none*/

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
function nextPlayer() {
    //swtich player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'block'; // Affiche le Dé
}
//Choix des noms de joueurs
function updateName() {

    let player_1Name = prompt('Please enter your Player 1 name !',);
    document.querySelector('#name-0').textContent = player_1Name;

    //Si le nom du joueur 1 n'est pas renseigné alors un nom de joueur par defaut est attibué.
    if (player_1Name = !player_1Name) {

        let defaultName_1 = 'Player 1';
        document.querySelector('#name-0').textContent = defaultName_1;
    }
    let player_2Name = prompt('Please enter your Player 2 name !');
    document.querySelector('#name-1').textContent = player_2Name;

    if (player_2Name = !player_2Name) {

        let defaultName_2 = 'Player 2';
        document.querySelector('#name-1').textContent = defaultName_2;
    }

}
//Action sur Bouton Roll DICE.
document.querySelector('.btn-roll').addEventListener('click', () => {
    audio.play('#audio');
    if (gamePlaying) {
        //Numéro au hazard
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

        // Update de du score globale du jour actif.
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Vérifier si un joueur à gagné la partie.
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none'; // cache le dé.
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.btn-new').style.display = 'block';
            document.querySelector('.btn-roll').style.display = 'none';
            document.querySelector('.btn-hold').style.display = 'none';
            document.querySelector('.dice').style.display = 'none';
            gamePlaying = false;

        } else {

            nextPlayer();
        }
    }
    audio.play('#audio');
});
//Action sur le bouton NewGame // init de la partie // Choix du nom de joueur
document.querySelector('.btn-new').addEventListener('click', init);
document.querySelector('.btn-new').addEventListener('click', updateName);










