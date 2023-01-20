import {FC, useState} from 'react';
import {Button, Keyboard, KeyCode, KeyMod, Spacer, useKeyboard} from '@geist-ui/react';
import Plus from '@geist-ui/react-icons/plus';
import AddProjectForm from './AddProjectForm';

const AddProjectButton: FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Reset form on Escape
  useKeyboard(() => {
    if (!isFormOpen) {
      setIsFormOpen(true);
    }
  }, [KeyMod.CtrlCmd, KeyCode.KEY_N]);

  return !isFormOpen ? (
    <Button
      auto
      autoFocus
      icon={<Plus />}
      px={0.6}
      scale={0.75}
      type="secondary"
      ghost
      onClick={() => setIsFormOpen(true)}
    >
      Add project
      <Spacer inline w={0.5} />
      <Keyboard command scale={0.5}>
        N
      </Keyboard>
    </Button>
  ) : (
    <AddProjectForm onClose={() => setIsFormOpen(false)} />
  );
};

export default AddProjectButton;
