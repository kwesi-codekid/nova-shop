import { Modal } from "antd"

const ConfirmModal = ({ title, text, open, setOpen, handleOk, handleCancel, loading, setLoading }) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Proceed"
      cancelText="Cancel"
      centered
      okButtonProps={{
        className: "bg-blue-600 font-sen !rounded-xl"
      }}
      cancelButtonProps={{
        className: "bg-red-500 font-sen !rounded-xl !text-white hover:!text-white hover:!border-transparent hover:bg-red-400"
      }}
    >
      <div className="py-6">
        <p className="font-sen text-lg">{text}</p>
      </div>
    </Modal>
  )
}

export default ConfirmModal