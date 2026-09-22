import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const mime = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".json":"application/json; charset=utf-8" };
const server = http.createServer((req,res)=>{
  const url = new URL(req.url,"http://localhost");
  let file = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
  file = path.normalize(file);
  if(file.startsWith("..") || path.isAbsolute(file)){ res.writeHead(403); return res.end("Forbidden"); }
  const full = path.join(root,file);
  fs.readFile(full,(err,data)=>{
    if(err){ res.writeHead(404); return res.end("Not Found"); }
    res.writeHead(200,{"Content-Type":mime[path.extname(full)]||"application/octet-stream"}); res.end(data);
  });
});
const port = Number(process.env.PORT||4173);
server.listen(port,"127.0.0.1",()=>console.log(`Game show running at http://127.0.0.1:${port}`));
