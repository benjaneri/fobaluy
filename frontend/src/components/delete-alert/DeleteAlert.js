import { AlertDialog, Button } from 'native-base';

const DeleteAlert = ({ deleteMessage, deleteBodyMessage, isOpen, onClose, onDelete, cancelRef }) => {
  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{deleteMessage}</AlertDialog.Header>
        <AlertDialog.Body>{deleteBodyMessage}</AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
              Cancel
            </Button>
            <Button colorScheme="danger" onPress={onDelete}>
              Delete
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default DeleteAlert;
