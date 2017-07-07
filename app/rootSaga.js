import SelectedMethod from 'containers/SelectedMethod/saga';
import Project from 'containers/Project/saga';
// import History from 'containers/History/saga';

function* rootSaga() {
    yield [
        Project(),
        SelectedMethod(),
        // History()
    ];
}


export default rootSaga;
