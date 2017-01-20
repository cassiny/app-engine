import './../src/server/app';
import data from './basic/dataPreparation';

describe('Test', () => {
  it('should be to prepare data', async () => {
    await data();
  });
});
