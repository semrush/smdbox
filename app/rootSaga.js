import CreateProject from 'containers/CreateProject/saga';
import SelectedMethod from 'containers/SelectedMethod/saga';

function* rootSaga() {
    yield [
        CreateProject(),
        SelectedMethod()
    ];
}


export default rootSaga;
