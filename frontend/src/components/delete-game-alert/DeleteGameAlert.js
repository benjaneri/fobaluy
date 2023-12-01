import { useEffect, useRef, useState } from 'react';
import { Center } from 'native-base';
import { deleteGame } from '../../services/games/games-service';
import DeleteAlert from '../delete-alert/DeleteAlert';

const DeleteGameAlert = ({ deleteAlertOpened, setDeleteAlertOpened, gameId, setIsRefreshing }) => {
  const [isOpen, setIsOpen] = useState(deleteAlertOpened);
  const onClose = () => {
    setDeleteAlertOpened(false);
    setIsOpen(false);
  };

  const onDelete = async () => {
    const response = await deleteGame(gameId);
    if (response.status === 200) {
      setDeleteAlertOpened(false);
      setIsOpen(false);
      setIsRefreshing(true);
    }
  };

  useEffect(() => {
    setIsOpen(deleteAlertOpened);
  }, [deleteAlertOpened]);

  const cancelRef = useRef(null);
  return (
    <Center>
      <DeleteAlert
        deleteMessage="Delete Game"
        deleteBodyMessage="Are you sure you want to delete this game? You would not be able to access its data anymore"
        isOpen={isOpen}
        onClose={onClose}
        onDelete={onDelete}
        cancelRef={cancelRef}
      />
    </Center>
  );
};

export default DeleteGameAlert;
