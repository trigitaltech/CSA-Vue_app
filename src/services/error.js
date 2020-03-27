export const extractError = err => {
    // console.log('got here err : ', err);
    if(err.message && err.message.errors) {
        // console.log('returning array');
        return err.message.errors;
    }
    if(err.message && err.message.error) {
        return err.message.error;
    }
    if(err.message && typeof err.message === 'string') {
        return err.message;
    }
    // console.log('returning string');
    return 'Something went wrong';
}