"""Optional local PlantUML -> SVG renderer. Requires Python 3 and Docker."""
from pathlib import Path
import subprocess
import urllib.request

root = Path(__file__).resolve().parents[1]
jar = root / "bin/plantuml.jar"
if not jar.exists():
    jar.parent.mkdir(exist_ok=True)
    temporary = jar.with_suffix(".jar.tmp")
    urllib.request.urlretrieve("https://github.com/plantuml/plantuml/releases/download/v1.2025.10/plantuml-1.2025.10.jar", temporary)
    temporary.replace(jar)
for source in sorted((root / "documentation/diagrams").glob("*.puml")):
    result = subprocess.run(["docker", "run", "--rm", "-i", "-v", f"{jar}:/renderer/plantuml.jar:ro", "eclipse-temurin:21-jdk", "java", "-Djava.awt.headless=true", "-jar", "/renderer/plantuml.jar", "-tsvg", "-pipe"], input=source.read_bytes(), capture_output=True)
    if result.returncode != 0 or b"<svg" not in result.stdout or b"Syntax Error" in result.stdout:
        raise SystemExit(f"Diagram error: {source.name}\n{result.stderr.decode()[:1000]}")
    source.with_suffix(".svg").write_bytes(result.stdout)
    print(f"SVG үүсгэлээ: {source.name}")
