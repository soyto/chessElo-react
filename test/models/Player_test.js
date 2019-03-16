import Player from '../../src/app/models/Player';

describe('Models', () => {
  describe('Player', () => {

    describe('#constructor', () => {

      describe('Should throw an Error', () => {

        it('if name argument is undefined', () => {
          try {
            new Player();
            fail('Should throw an exception');
          } catch(error) {
            expect(error.message).toBeDefined();
          }
        });

        it('if name argument is null', () => {
          try {
            new Player(null);
            fail('Should throw an exception');
          } catch(error) {
            expect(error.message).toBeDefined();
          }
        });

        it('if name argument is not a string', () => {
          try {
            new Player({});
            fail('Should throw an exception');
          } catch(error) {
            expect(error.message).toBeDefined();
          }
        });

        it('if name argument is not an empty string', () => {
          try {
            new Player('');
            fail('Should throw an exception');
          } catch(error) {
            expect(error.message).toBeDefined();
          }
        });

        it('if name argument is not an blank string', () => {
          try {
            new Player('      ');
            fail('Should throw an exception');
          } catch(error) {
            expect(error.message).toBeDefined();
          }
        });

      });

      it('Should have the same name as constructor argument', () => {
        const name = 'John Doe';
        let player = new Player(name);

        expect(player.name).toBe(name);

      });

      it('Should start with 1500 Elo', () => {
        const name = 'John Doe';
        let player = new Player(name);
        expect(player.elo).toBe(1500);
      });

      it('Should have unique uuid', () => {
        const name = 'John Doe';
        let player = new Player(name);
        expect(player.uuid).toBeDefined;
      });

    });

    describe('#generate', () => {
      it('Should generate new player with random name', () => {
        let player = Player.generate();
        expect(player.name).toBeDefined();
      });
    });
  });
});