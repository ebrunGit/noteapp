import Toastr from 'toastr';
import { toastrMessages } from "./textReferences";

export const toastrWarning = () => Toastr.warning(toastrMessages.warningMsg, '', options)
export const toastrCreationSuccess = () => Toastr.success(toastrMessages.CreationSuccessMsg, '', options)
export const toastrModifSuccess = () => Toastr.success(toastrMessages.ModifSuccessMsg, '', options)

const options: ToastrOptions = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-full-width",
    "preventDuplicates": false,
    "onclick": undefined,
    "showDuration": 300,
    "hideDuration": 300,
    "timeOut": 5000,
    "extendedTimeOut": 1000,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

