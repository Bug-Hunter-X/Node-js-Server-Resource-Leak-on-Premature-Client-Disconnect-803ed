# Node.js Server Resource Leak on Premature Client Disconnect

This repository demonstrates a potential resource leak in a Node.js server when a client disconnects before a long-running operation completes.  The server uses `setInterval` to simulate a long task.  If a client closes the connection before the task finishes, the interval continues running indefinitely, consuming resources.

## Bug Description
The `req.on('close', ...)` event is used to attempt to clean up the interval when the client closes the connection. However, this is not a reliable solution because the `close` event might fire before `setInterval`'s first iteration.