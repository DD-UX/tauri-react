import {FC, useState} from 'react';
import {Button} from '@geist-ui/react';
import Plus from '@geist-ui/react-icons/plus';
import AddProjectForm from './AddProjectForm';

const AddProjectButton: FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return !isFormOpen ? (
    <Button
      auto
      icon={<Plus />}
      px={0.6}
      scale={0.75}
      type="secondary"
      ghost
      onClick={() => setIsFormOpen(true)}
    >
      Add project
    </Button>
  ) : (
    <AddProjectForm onClose={() => setIsFormOpen(false)} />
  );
};

export default AddProjectButton;
