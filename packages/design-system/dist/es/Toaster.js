import toast from 'react-hot-toast';
export { Toaster } from 'react-hot-toast';
import { Fonts } from './fonts.js';

function useToaster() {
  const style = {
    borderRadius: "4px",
    ...Fonts.body
  };
  return {
    notify: message => {
      toast(message, {
        style
      });
    },
    success: function (message) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      toast.success(message, {
        style,
        duration: options.duration
      });
    },
    error: message => {
      toast.error(message, {
        style
      });
    }
  };
}

export { useToaster };
