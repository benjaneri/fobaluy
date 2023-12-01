import { useEffect, useRef, useState } from 'react';
import { Center } from 'native-base';
import { deleteUser } from '../../services/users/users-service';
import { deleteAllKeys } from '../../common/session-info';
import DeleteAlert from '../../components/delete-alert/DeleteAlert';

const DeleteUserAlert = ({ deleteAlertOpened, setDeleteAlertOpened, userId, setUserLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(deleteAlertOpened);
  const onClose = () => {
    setDeleteAlertOpened(false);
    setIsOpen(false);
  };

  const onDelete = async () => {
    const response = await deleteUser(userId);
    if (response.status === 200) {
      setDeleteAlertOpened(false);
      setIsOpen(false);
      await deleteAllKeys();
      setUserLoggedIn(false);
    }
  };

  useEffect(() => {
    setIsOpen(deleteAlertOpened);
  }, [deleteAlertOpened]);

  const cancelRef = useRef(null);
  return (
    <Center>
      <DeleteAlert
        deleteMessage="Delete Profile"
        deleteBodyMessage="Are you sure you want to delete your user? You would not be able to access it anymore"
        isOpen={isOpen}
        onClose={onClose}
        onDelete={onDelete}
        cancelRef={cancelRef}
      />
    </Center>
  );
};

export default DeleteUserAlert;
