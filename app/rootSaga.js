import SelectedMethod from 'containers/SelectedMethod/saga';
import Project from 'containers/Project/saga';

function* rootSaga() {
    yield [
        Project(),
        SelectedMethod()
    ];
}


export default rootSaga;
