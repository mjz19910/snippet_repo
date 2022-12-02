dfw28s25-in-f0.1e100.net

# explore nearby
```bash
nmap 142.250.69.{0,32,64,96,128,160,192,224} -sL --dns-servers 1.1.1.1
```
# explore 255.255.0.0/16 mask
nmap 142.250.{0..255}.{0,32,64,96,128,160,192,224} -sL --dns-servers 1.1.1.1


# sections
142.250.0.0/16 -> unverified-forwarding
# unverified-forwarding
- 108.177.16.0/24   ` {0..255}.r1.unverified-forwarding.1e100.net `
- 108.177.17.248/24 ` {0..255}.r2.unverified-forwarding.1e100.net `
- 142.250.220.0/24  ` {0..255}.r3.unverified-forwarding.1e100.net `
- 142.250.221.0/24  ` {0..255}.r4.unverified-forwarding.1e100.net `
