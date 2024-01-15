import { MouseEventHandler, forwardRef } from "react"

interface Props {
  children?: React.ReactNode;
  title?: string;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export type Ref = HTMLDialogElement;

export default forwardRef<Ref, Props>(function Modal({children, title, onClose}, ref){
  return (
    <dialog ref={ref} className="shadow p-4">
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-4 border-b-[1px] border-background-300">
          <h3 className="text-xl font-medium text-text-200">{title}</h3>
          <button
            type="button"
            className="text-3xl hover:bg-background-300 hover:text-text-100 w-8 ms-auto inline-flex justify-center items-center"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="w-auto">
          {children}
        </div>
      </div>
    </dialog>
  )
})