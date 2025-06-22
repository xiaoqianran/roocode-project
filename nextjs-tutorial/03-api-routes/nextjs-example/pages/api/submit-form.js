export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body;
    // 在实际应用中，这里会保存数据到数据库
    console.log('Received form submission:', { name, email });
    res.status(200).json({ message: '表单提交成功！', data: { name, email } });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}