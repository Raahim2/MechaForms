import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
load_dotenv()   

# Replace with your actual URI from MongoDB Atlas
MONGODB_URL = os.getenv("MONGODB_URL")

async def seed():
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client["mecha_platform"]
    col = db["extensions"]

    # Clear existing to avoid duplicates during testing
    await col.delete_many({})

    java_pack = {
        "slug": "java-pro",
        "name": "Java Pro-Pack",
        "version": "v2.4.1",
        "author": "OracleDevs",
        "installs": "24.8k",
        "reliability": "99.9%",
        "category": "Development",
        "icon": "Code2", 
        "color": "from-orange-500/20",
        "tagline": "Advanced Java 21+ syntax protocols and enterprise boilerplate.",
        "description": "The ultimate shortcut library for professional Java engineers. Includes high-velocity triggers for Spring Boot, Stream API, concurrency, and standard boilerplate reduction.",
        "manifest": [
            # Boilerplate
            {"trigger": "@psvm", "output": "public static void main(String[] args) {\n    \n}"},
            {"trigger": "@sout", "output": "System.out.println(\"\");"},
            {"trigger": "@class", "output": "public class Name {\n    \n    public Name() {\n        \n    }\n}"},
            
            # Control Flow
            {"trigger": "@fori", "output": "for (int i = 0; i < count; i++) {\n    \n}"},
            {"trigger": "@foreach", "output": "for (var item : items) {\n    \n}"},
            {"trigger": "@if", "output": "if (condition) {\n    \n}"},
            {"trigger": "@ifelse", "output": "if (condition) {\n    \n} else {\n    \n}"},
            {"trigger": "@try", "output": "try {\n    \n} catch (Exception e) {\n    e.printStackTrace();\n}"},
            {"trigger": "@switch", "output": "switch (value) {\n    case 1 -> { }\n    default -> { }\n}"},

            # Modern Java / Collections
            {"trigger": "@list", "output": "List<String> list = new ArrayList<>();"},
            {"trigger": "@map", "output": "Map<String, Object> map = new HashMap<>();"},
            {"trigger": "@stream", "output": "list.stream()\n    .filter(x -> x != null)\n    .map(x -> x)\n    .collect(Collectors.toList());"},
            
            # Enterprise / Spring 
            {"trigger": "@rest", "output": "@RestController\n@RequestMapping(\"/api/v1\")\npublic class Controller {\n    \n}"},
            {"trigger": "@get", "output": "@GetMapping(\"/{id}\")\npublic ResponseEntity<?> get(@PathVariable String id) {\n    return ResponseEntity.ok().build();\n}"},
            {"trigger": "@autowired", "output": "@Autowired\nprivate ServiceName service;"},
            
            # Documentation
            {"trigger": "@todo", "output": "// TODO: Implementation required by Engine context"},
            {"trigger": "@fixme", "output": "// FIXME: Potential memory leak in technical protocol"}
        ]
    }

    await col.insert_one(java_pack)
    print("------------------------------------------")
    print(" Java Pro-Pack Seeded Successfully!")
    print(f" Total Shortcuts: {len(java_pack['manifest'])}")
    print("------------------------------------------")

if __name__ == "__main__":
    asyncio.run(seed())