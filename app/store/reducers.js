import * as testReducer from '../features/test/reducers';
import * as authReducer from '../features/auth/reducers';
import * as homeReducer from '../features/home/reducers';
import * as notiReducer from '../features/notification/reducers';
import * as docReducer from '../features/document/reducers';
import * as newsReducer from '../features/news/reducers';
import * as salaryReducer from '../features/salary/reducers';
import * as menuReducer from '../features/menu/reducers';
import * as profileReducer from '../features/profile/reducers';

export default Object.assign({
  ...testReducer,
  ...authReducer,
  ...homeReducer,
  ...notiReducer,
  ...docReducer,
  ...newsReducer,
  ...salaryReducer,
  ...menuReducer,
  ...profileReducer,
});
