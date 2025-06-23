# Deployment Guide - A-Fields Store

## Fixing GitHub Pages Deployment Issues

### Step 1: Update Repository Settings

1. Go to your repository: `https://github.com/THDevinTjaden/a-fields-store-jekyll`
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Save the changes

### Step 2: Update Configuration

1. **Update `_config.yml`:**
   - Replace `yourusername` with your actual GitHub username: `THDevinTjaden`
   - The URL should be: `https://thdevintjaden.github.io`

2. **Commit and push the changes:**
   ```bash
   git add .
   git commit -m "Fix GitHub Pages deployment"
   git push origin main
   ```

### Step 3: Check GitHub Actions

1. Go to the **Actions** tab in your repository
2. You should see a new workflow run
3. The build should now succeed

### Step 4: Access Your Site

Once the deployment is successful, your site will be available at:
`https://thdevintjaden.github.io/a-fields-store-jekyll/`

## Troubleshooting

### If you still get permission errors:

1. **Check repository permissions:**
   - Go to Settings → Actions → General
   - Ensure "Allow GitHub Actions to create and approve pull requests" is enabled

2. **Verify workflow permissions:**
   - The updated workflow now uses the correct permissions
   - It should work with the default GitHub token

3. **Alternative deployment method:**
   If you prefer, you can also use the traditional GitHub Pages method:
   - Go to Settings → Pages
   - Select **Deploy from a branch**
   - Choose **main** branch and **/ (root)** folder
   - This will build automatically without Actions

### Local Testing

To test locally before deploying:

```bash
# Install dependencies
bundle install

# Run locally
bundle exec jekyll serve

# Visit http://localhost:4000
```

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add your domain in Settings → Pages → Custom domain
2. Update `_config.yml` with your domain
3. Add a CNAME file to your repository root

## Support

If you continue to have issues:

1. Check the Actions logs for specific error messages
2. Ensure all files are properly committed
3. Verify your GitHub account has the necessary permissions

---

**Note:** The updated workflow uses the official GitHub Pages Actions, which should resolve the permission issues you were experiencing. 