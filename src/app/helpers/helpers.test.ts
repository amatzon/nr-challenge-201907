import { generateID } from '@/app/helpers/helpers';

test('Generates random number', () => {
    const id = generateID;
    expect(id).not.toBeNaN();
});