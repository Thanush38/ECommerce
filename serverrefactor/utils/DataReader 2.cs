using Newtonsoft.Json.Linq;

namespace Utils;
using System;
using System.IO;
using Newtonsoft.Json;
class DataReader
{
    
    public string ReadData()
    {
        using StreamReader reader = new StreamReader("./resources/Development.json");
        
        string line = reader.ReadToEnd();
        return line;
    }
    
    public string ReadData(string key)
    {
        using StreamReader reader = new StreamReader("./resources/Development.json");
        
        string line = reader.ReadToEnd();
        dynamic data = JsonConvert.DeserializeObject(line);
        data = data.items;
        int count = 0;
        string total = "";
        foreach (var item in data)
        {
            Boolean found = false;
            Console.WriteLine(count);
            count++;
            foreach (var i in item.keyWords)
            {
                Console.WriteLine(i);
                if(i==key)
                {
                    found = true;
                    string add = JsonConvert.SerializeObject(item);
                    total = total + add;
                    break;
                }
            }
            
        }
        
        return total;
        
    }

    public string ReadAllImages(string id)
    {
        string data = ReadData(id); // Assuming ReadData returns a JSON string
        dynamic jsonData = JsonConvert.DeserializeObject(data);

        string imageDir = jsonData.imageLocation;
    
        // Check if the directory exists
        if (!Directory.Exists(imageDir))
        {
            throw new DirectoryNotFoundException($"Directory not found: {imageDir}");
        }

        string[] files = Directory.GetFiles(imageDir);
        JArray array = new JArray();

        foreach (string file in files)
        {
            byte[] fileBytes = File.ReadAllBytes(file);
            string base64String = Convert.ToBase64String(fileBytes);
            base64String = "data:image/png;base64," + base64String;
            array.Add(base64String);
        }

        // Convert dynamic to JObject to add a new property
        JObject jsonObject = JObject.FromObject(jsonData);
        jsonObject["imageCode"] = array;

        return jsonObject.ToString();
    }
    
    
}