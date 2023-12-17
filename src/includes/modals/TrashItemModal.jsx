import { Modal } from 'antd';

const TrashItemModal = ({ title, text, open, setOpen, onOk, onCancel, loadingTrashItem}) => {
    return (
        <div>
            <Modal
                title={title}
                open={open}
                onOk={onOk}
                setOpen={setOpen}
                confirmLoading={loadingTrashItem}
                okText="Proceed"
                cancelText="Cancel"
                onCancel={onCancel}
                centered
                okButtonProps={{
                  className: "bg-blue-600 font-sen !rounded-xl"
                }}
                cancelButtonProps={{
                  className: "bg-red-500 font-sen !rounded-xl !text-white hover:!text-white hover:!border-transparent hover:bg-red-400"
                }}
            >
                <p className="font-sen text-lg">{text}</p>
            </Modal>
        </div>
    );
}

export default TrashItemModal;