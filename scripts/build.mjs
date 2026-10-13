import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { convertFile, MemoryLogger, LoggerManager } from '@asciidoctor/core';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'documentation');
const output = path.join(root, 'build/html');
fs.mkdirSync(output, { recursive: true });
const logger = new MemoryLogger();
LoggerManager.setLogger(logger);
const html = await convertFile(path.join(source, 'architecture.adoc'), {
  safe: 'safe', base_dir: source, to_file: false,
  standalone: true, attributes: { 'source-highlighter': 'none', 'reproducible': '' }
});
const messages = logger.getMessages();
if (messages.length > 0) {
  for (const message of messages) console.error(message.getSeverity(), message.getText());
  process.exitCode = 1;
} else {
  fs.writeFileSync(path.join(output, 'index.html'), html);
  fs.cpSync(path.join(source, 'diagrams'), path.join(output, 'diagrams'), { recursive: true });
  fs.writeFileSync(path.join(output, '.nojekyll'), '');
  console.log('HTML үүсгэлээ: build/html/index.html');
}
