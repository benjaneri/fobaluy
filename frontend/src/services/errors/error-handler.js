import { deleteKey } from '../../common/session-info';

const errorHandler = (error) => {
  if (error.response) {
    if (error.response.status === 401 || error.response.status === 403) {
      deleteKey('token');
      deleteKey('userId');
    }
  }
};

export default errorHandler;
