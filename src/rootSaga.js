import MethodViewer from 'containers/MethodViewer/saga';
import Project from 'containers/Project/saga';
import History from 'containers/History/saga';

function* rootSaga() {
    yield [
        Project(),
        MethodViewer(),
        History()
    ];
}


export default rootSaga;
