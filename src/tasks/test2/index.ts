import * as main from '../../index';
module.exports.run = (args: any) => {
    main.save2log(module.filename, args + 'task2');

};
