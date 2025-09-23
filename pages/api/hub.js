// hub.js
const deviceDB = new Map([
  ["abc123", { timezone: "America/Sao_Paulo" }],
  ["xyz789", { timezone: "UTC" }],
]);

export default async function handler(req, res) {
    try {
        const { action, id } = req.query;
        console.log(`Received ${req.method} request with action: ${action} and id: ${id}`);

        if (!action) {
            return res.status(400).json({ error: 'Action is required' });
        }

        if (req.method === 'GET') {
            switch (action) {
                case 'time':
                    const deviceInfo = id ? deviceDB.get(id) : null;
                    const timezone = deviceInfo?.timezone || "America/Sao_Paulo";

                    // Gera a data no timezone correto
                    const now = new Date();
                    const formatter = new Intl.DateTimeFormat('sv-SE', {
                        timeZone: timezone,
                        hour12: false,
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    });

                    // Resultado do formatter: "2025-09-23 07:49:06"
                    const parts = formatter.formatToParts(now);
                    const dateStr = `${parts.find(p => p.type === 'year').value}-${parts.find(p => p.type === 'month').value}-${parts.find(p => p.type === 'day').value}T${parts.find(p => p.type === 'hour').value}:${parts.find(p => p.type === 'minute').value}:${parts.find(p => p.type === 'second').value}-03:00`;

                    console.log(`ID: ${id || "sem ID"}, timezone: ${timezone}, hora: ${dateStr}`);

                    globalThis.CurrentTime = dateStr;

                    res.status(200).json({ time: dateStr });
                    break;

                default:
                    res.status(400).json({ error: 'Invalid action for GET request.' });
            }
        } else {
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Internal server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
