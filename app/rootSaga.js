import createProject from 'containers/CreateProject/saga';

function* rootSaga() {
    yield [
        createProject()
    ];
}


export default rootSaga;
