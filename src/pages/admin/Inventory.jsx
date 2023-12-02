

const Inventory = () => {
  const [loading, setLoading] = useState(true)
  return (
    <div>
      <Table loading={loading} />
    </div>
  )
}

export default Inventory