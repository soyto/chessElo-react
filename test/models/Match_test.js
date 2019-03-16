import Player from '../../src/app/models/Player';
import Match from '../../src/app/models/Match';

describe('Models', () => {
  describe('Match', () => {


    describe('#constructor', () => {

      describe('Should throw an Error', () => {

        describe('if whitePlayer argument is', () => {

          it('undefined', () => {
            try {
              new Match();
              fail('Should throw an exception');
            } catch(error) {
              expect(error.message).toBeDefined();
            }
          });

          it('not a Player', () => {
            try {
              new Match({});
              fail('Should throw an exception');
            } catch(error) {
              expect(error.message).toBeDefined();
            }
          });

        });

        describe('if blackPlayer argument is', () => {

          it('undefined', () => {
            try {
              let whitePlayer = Player.generate();
              new Match(whitePlayer);
              fail('Should throw an exception');
            } catch(error) {
              expect(error.message).toBeDefined();
            }
          });

          it('not a Player', () => {
            try {
              let whitePlayer = Player.generate();
              new Match(whitePlayer, {});
              fail('Should throw an exception');
            } catch(error) {
              expect(error.message).toBeDefined();
            }
          });

        });


        it('Should generate a unique uuid', () => {
          let playerA = Player.generate();
          let playerB = Player.generate();

          let match = new Match(playerA, playerB);

          expect(match.uuid).toBeDefined();
        });

        describe('Should generate whitePlayer property', () => {

          it('with the white player as player value', () => {
            let playerA = Player.generate();
            let playerB = Player.generate();

            let match = new Match(playerA, playerB);

            expect(match.whitePlayer.player).toBe(playerA);
          });

        });

        describe('Should generate blackPlayer property', () => {

          it('with the black player as player value', () => {
            let playerA = Player.generate();
            let playerB = Player.generate();

            let match = new Match(playerA, playerB);

            expect(match.blackPlayer.player).toBe(playerB);
          });
        });

        describe('Chance stats should be', () => {

          it('On same ELO must be 0.5 chance', () => {
            let playerA = Player.generate();
            let playerB = Player.generate();

            let match = new Match(playerA, playerB);

            expect(match.whitePlayer.chance).toBe(0.5);
            expect(match.whitePlayer.onWin).toBe(15);
            expect(match.whitePlayer.onLose).toBe(-15);
            expect(match.whitePlayer.onWithdraw).toBe(0);


            expect(match.blackPlayer.chance).toBe(0.5);
            expect(match.blackPlayer.onWin).toBe(15);
            expect(match.blackPlayer.onLose).toBe(-15);
            expect(match.blackPlayer.onWithdraw).toBe(0);

          });

          it('Case 1', () => {
            let playerA = Player.generate();
            let playerB = Player.generate();

            playerA.elo = 1800;
            playerB.elo = 1400;

            let match = new Match(playerA, playerB);

            expect(match.whitePlayer.chance).toBe(0.9090909090909091);
            expect(match.whitePlayer.onWin).toBe(3);
            expect(match.whitePlayer.onLose).toBe(-27);
            expect(match.whitePlayer.onWithdraw).toBe(-12);


            expect(match.blackPlayer.chance).toBe(0.09090909090909091);
            expect(match.blackPlayer.onWin).toBe(27);
            expect(match.blackPlayer.onLose).toBe(-3);
            expect(match.blackPlayer.onWithdraw).toBe(12);
          });

          it('Case 2', () => {
            let playerA = Player.generate();
            let playerB = Player.generate();

            playerA.elo = 2600;
            playerB.elo = 2600;

            let match = new Match(playerA, playerB);

            expect(match.whitePlayer.chance).toBe(0.5);
            expect(match.whitePlayer.onWin).toBe(8);
            expect(match.whitePlayer.onLose).toBe(-7);
            expect(match.whitePlayer.onWithdraw).toBe(0);


            expect(match.blackPlayer.chance).toBe(0.5);
            expect(match.blackPlayer.onWin).toBe(8);
            expect(match.blackPlayer.onLose).toBe(-7);
            expect(match.blackPlayer.onWithdraw).toBe(0);
          });

          it('Case 3', () => {
            let playerA = Player.generate();
            let playerB = Player.generate();

            playerA.elo = 1100;
            playerB.elo = 2600;

            let match = new Match(playerA, playerB);

            expect(match.whitePlayer.chance).toBe(0.000177796323849704);
            expect(match.whitePlayer.onWin).toBe(30);
            expect(match.whitePlayer.onLose).toBe(0);
            expect(match.whitePlayer.onWithdraw).toBe(15);


            expect(match.blackPlayer.chance).toBe(0.9998222036761503);
            expect(match.blackPlayer.onWin).toBe(0);
            expect(match.blackPlayer.onLose).toBe(-15);
            expect(match.blackPlayer.onWithdraw).toBe(-7);
          });

        });

      });


    });

    describe('#play', () => {

      describe('Should throw an exception', () => {

        it('if was played before', () => {
          let playerA = Player.generate();
          let playerB = Player.generate();

          let match = new Match(playerA, playerB);

          match.play(1, (new Date()));

          try {
            match.play(0, (new Date()));
            fail('Should thrown an exception');
          } catch(error) {
            expect(error.message).toBeDefined();
          }

        });

        it('if a bad value is assigned as matchResult', () => {
          let playerA = Player.generate();
          let playerB = Player.generate();

          let match = new Match(playerA, playerB);
          try {
            match.play(2, (new Date()));
          } catch(error) {
            expect(error.message).toBeDefined();
          }
        });

      });

      describe('Should change players score', () => {

        it('if was white win', () => {

          let playerA = Player.generate();
          let playerB = Player.generate();

          let match = new Match(playerA, playerB);

          match.play(1, (new Date()));

          expect(playerA.elo).toBe(1515);
          expect(playerB.elo).toBe(1485);
        });

        it('if was black win', () => {

          let playerA = Player.generate();
          let playerB = Player.generate();

          let match = new Match(playerA, playerB);

          match.play(1, (new Date()));

          expect(playerA.elo).toBe(1515);
          expect(playerB.elo).toBe(1485);
        });

        it('if was withdraw', () => {

          let playerA = Player.generate();
          let playerB = Player.generate();

          playerA.elo = 1600;
          playerB.elo = 1550;

          let match = new Match(playerA, playerB);

          match.play(0.5, (new Date()));

          expect(playerA.elo).toBe(1598);
          expect(playerB.elo).toBe(1552);
        });


      });

    });

  });
});